import os
from rest_framework.decorators import api_view
from rest_framework.request import HttpRequest, Request
from rest_framework.response import Response
from rest_framework import status
from custom_auth.decorators import require_confirmed_author
from .serializers import PostSerializer
from .models import ( Post)
from django.core.exceptions import  ObjectDoesNotExist
from django.core.files.storage import default_storage
from django.conf import settings



@api_view(["GET"])
def list_car_posts(_:Request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@require_confirmed_author
def list_my_car_posts(request:HttpRequest):
    author= request.user
    posts = Post.objects.filter(author=author)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def car_post_details(_:Request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@require_confirmed_author
def update_car_post(request, pk):
    author = request.user

    try:

        try:
            post = Post.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Car post does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if  not (post.author == author):
            return Response(
                status=status.HTTP_401_UNAUTHORIZED,
            )


        data = request.data.copy()
        no_image_on_req = False
        if 'car_image' in data and not data['car_image']:
            no_image_on_req = True
            data.pop('car_image')
        serializer = PostSerializer(post,data=data, context ={'author':request.user}, partial=True)
        if serializer.is_valid():
            serializer.save()
            if no_image_on_req:
                image_file = post.car_image.name
                delete_car_image(image_file)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )  
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )  
    except Exception as e:
        print(e)
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["DELETE"])
def delete_car_post(request:HttpRequest, pk):
    user = request.user
    try:
        post = Post.objects.get(id=pk)
        if not(post.author == user):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        image_name = post.car_image.name
        delete_car_image(image_name)
        post.delete()
        return Response(status=status.HTTP_200_OK)

    except Exception :
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(["POST"])
def create_post(request:Request):
    try:
        serializer = PostSerializer(data=request.data, context ={'author':request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )  
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )  

    except Exception as e:
        print(e)

        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

def delete_car_image(car_image_name):
    try:
        old_image_path = os.path.join(settings.MEDIA_ROOT, str(car_image_name))
        if default_storage.exists(old_image_path):
            default_storage.delete(old_image_path)
    except Exception as e:
        print(e)

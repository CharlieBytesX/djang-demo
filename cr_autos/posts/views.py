import os
from rest_framework.decorators import api_view
from rest_framework.request import HttpRequest, Request
from rest_framework.response import Response
from rest_framework import status
from custom_auth.decorators import require_confirmed_author
from custom_auth.models import Author
from .serializers import PostSerializer
from .models import ( Post)
from django.core.exceptions import  ObjectDoesNotExist
from django.core.files.storage import default_storage
from django.conf import settings
from typing import cast



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

        title: str = request.POST.get("title")
        description: str = request.POST.get("description")
        contact_number: str = request.POST.get("contact_number")
        price: str = request.POST.get("price")
        image_file = request.FILES.get("image")


        # Delete the old image file
        if image_file:
            old_image_path = os.path.join(settings.MEDIA_ROOT, str(post.car_image))
            if default_storage.exists(old_image_path):
                default_storage.delete(old_image_path)
            post.car_image = image_file
        if title:
            post.title = title
        if price:
            post.price = float(price)
        if description:
            post.description = description
        if contact_number:
            post.contact_number = contact_number

        post.save()

        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    except Exception:
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
        post.delete()
        return Response(status=status.HTTP_200_OK)

    except Exception :
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(["POST"])
def create_post(request:HttpRequest):
    try:
        title = request.POST.get("title")
        description = request.POST.get("description")
        contact_number = request.POST.get("contact_number")
        price = request.POST.get("price")
        image_file = request.FILES.get("image")

        if not title or not description or not image_file or not price or not contact_number:
            return Response(
                {"error": "Missing title, description or image"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = cast(Author,request.user)
        # New post
        new_post = Post()
        new_post.title = title
        new_post.author = user
        new_post.car_image = image_file
        new_post.description = description
        new_post.price = float(price)
        new_post.contact_number = contact_number
        new_post.save()

        serializer = PostSerializer(instance=new_post)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED
        )  

    except Exception :
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

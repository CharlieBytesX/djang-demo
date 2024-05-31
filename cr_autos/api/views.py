
from http.client import OK, UNAUTHORIZED
import os
from rest_framework.decorators import api_view
from rest_framework.request import HttpRequest, Request
from rest_framework.response import Response
from rest_framework import status

from .forms.user_sign_up import AuthorRegistrationForm


from .serializers import PostSerializer
from .models import Post
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import default_storage
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm


@api_view(["GET"])
def apiOverview(_:Request):
    api_urls = {
        "List": "/car_posts/",
        "Detail View": "/car_posts/<str:pk>/",
        "Create": "/car_posts/",
        "Update": "/car_posts/<str:pk>/",
        "Delete": "/car_posts/<str:pk>/",
    }
    return Response(api_urls)

@api_view(["POST"])
def register(request:Request):
    form = AuthorRegistrationForm(request.POST)
    print(request.POST)
    if form.is_valid():
        user = form.save()
        print(user)
    else:
        print(form.errors.as_json())
        return(Response(status=status.HTTP_400_BAD_REQUEST, data= form.errors.as_json() ))

    return Response(OK)


@api_view(["GET"])
def list_car_posts(request:Request):
    print(request.user)
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def list_my_car_posts(request:HttpRequest):
    if not request.user.is_authenticated:
        return Response(status=UNAUTHORIZED)
    
    print(request.user)
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def car_post_details(_:Request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def update_car_post(request, pk):
    try:
        title: str = request.POST.get("title")
        description: str = request.POST.get("description")
        image_file = request.FILES.get("image")

        if not title or not description or not image_file:
            return Response(
                {"error": "Missing title, description or image"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            post = Post.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Car post does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Delete the old image file
        if post.car_image:
            old_image_path = os.path.join(settings.MEDIA_ROOT, str(post.car_image))
            if default_storage.exists(old_image_path):
                default_storage.delete(old_image_path)

        post.title = title
        post.description = description
        post.car_image = image_file
        post.save()

        serializer = PostSerializer(instance=post, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
def delete_car_post(_, pk):
    post = Post.objects.get(id=pk)
    post.delete()
    return Response("Delete car post successfully")


@api_view(["POST"])
def create_post(request:HttpRequest):
    try:
        title = request.POST.get("title")
        description = request.POST.get("description")
        contact_number = request.POST.get("contactNumber")
        price = request.POST.get("price")
        image_file = request.FILES.get("image")

        if not title or not description or not image_file or not price or not contact_number:
            return Response(
                {"error": "Missing title, description or image"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
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

    except Exception as e:
        print(e)
        return Response(
            {"error": "Internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.shortcuts import redirect
from http.client import OK
from rest_framework.decorators import api_view
from rest_framework.request import HttpRequest 
from rest_framework.response import Response
from rest_framework import status

from .forms import AuthorRegistrationForm



from .models import ( TOKEN_EXTENSION, EmailConfirmationToken,Author)
from django.conf import settings
from django.contrib.auth import  login, logout 
from typing import cast

# Create your views here.

@api_view(["GET"])
def im_logged_in(request:HttpRequest):
    user =  cast(Author,request.user)
    if user == None or not user.is_active:
        return Response(status=status.HTTP_401_UNAUTHORIZED )
    elif (not user.is_email_confirmed):
        return Response(status=status.HTTP_403_FORBIDDEN )

    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def sign_out(request:HttpRequest):
    try:
        logout(request)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def sign_in(request:HttpRequest):
    email = request.POST.get("email")
    password = request.POST.get("password")
    try:
        user = Author.objects.get(email=email)
        if  not user.check_password(password):
            return Response(status= status.HTTP_401_UNAUTHORIZED, data="Invalid Credentials")
        if not user.is_active:
            return Response(status= status.HTTP_401_UNAUTHORIZED, data="Invalid Credentials")
        if not user.is_email_confirmed:
            return Response(status=status.HTTP_403_FORBIDDEN, data="Pls confirm email before login")

        login(request=request, user= user)
        return Response(status= status.HTTP_200_OK)
    except Author.DoesNotExist :
         return Response(status= status.HTTP_401_UNAUTHORIZED, data="Invalid Credentials")

@api_view(["POST"])
def register(request:HttpRequest):
    form = AuthorRegistrationForm(request.POST)
    if (form.is_valid()):
        new_user : Author = form.save(commit=False)
        new_user.is_active = True
        new_user.save()

        token =  get_random_string(TOKEN_EXTENSION)
        verification_token = EmailConfirmationToken()
        verification_token.token = token
        verification_token.user = new_user
        verification_token.save()

        verification_link = f"{settings.DOMAIN}/api/verify_account/{token}"

        send_mail(
            subject="Confirm your CR account",
            message=f"Pls verify your account clicking this link\n{verification_link} ",
            from_email=settings.EMAIL_HOST_USER ,
            recipient_list=[new_user.email])
        return Response(OK)
    else:
        return(Response(status=status.HTTP_400_BAD_REQUEST, data= form.errors ))


@api_view(["GET"])
def confirm_email(request:HttpRequest,token):

    try:
        email_token = EmailConfirmationToken.objects.get(token= token)
        author = email_token.user
        author.is_active = True
        author.is_email_confirmed = True
        author.save()
        login(request=request, user= author)
        email_token.delete()

        return redirect(to="/") 

    except EmailConfirmationToken.DoesNotExist:
        user = request.user
        if user.is_active:
            return redirect(to="/") 
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception :
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    


@api_view(["POST"])
# Always will be returning with 200 because this will prevent an atacker to know the valid emails 
def resend_email(request:HttpRequest):
    email = request.POST.get("email")
    try:
        user = Author.objects.get(email=email)
        if not user.is_email_confirmed:
            token =  get_random_string(TOKEN_EXTENSION)
            verification_token = EmailConfirmationToken.objects.get(user=user)
            verification_token.token = token
            verification_token.save()
            login(request,user)

            verification_link = f"{settings.DOMAIN}/api/verify_account/{token}"

            send_mail(
                subject="Confirm your CR account",
                message=f"Pls verify your account clicking this link\n{verification_link} ",
                from_email=settings.EMAIL_HOST_USER ,
                recipient_list=[user.email])

        return Response(status=status.HTTP_200_OK )
    except Author.DoesNotExist: 
        return Response(status=status.HTTP_200_OK )


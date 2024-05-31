import os
from uuid import uuid4
from django.contrib.auth.models import (AbstractUser, PermissionsMixin, AbstractBaseUser,  UserManager, BaseUserManager)
from django.db import models

# Create your models here.

from typing import Final

CAR_IMAGE_FOLDER: Final[str] = "car_images"


def custom_upload_to(_, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{uuid4().hex}{extension}"
    filename = os.path.join(CAR_IMAGE_FOLDER, filename)
    # Return the new filename
    return filename




class AuthorManager(BaseUserManager):
    def create_author(self, email, password) -> 'Author':
        if not email:
            raise ValueError('Email required')
        email = self.normalize_email(email)
        user = self.model(email = email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password) ->'Author':
        user = self.create_author(email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Author(AbstractUser):
    email = models.EmailField(unique=True)
    is_email_confirmed = models.BooleanField(default=False)

    USERNAME_FIELD =("email")
    REQUIRED_FIELDS = [ 'password']

    objects = AuthorManager()

    def __str__(self):
        return self.email

class EmailConfirmationToken(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Author, on_delete=models.CASCADE)


class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    car_image = models.FileField(upload_to=custom_upload_to)
    price = models.FloatField()
    contact_number = models.CharField(max_length=8)
    author = models.ForeignKey(Author,on_delete=models.CASCADE)

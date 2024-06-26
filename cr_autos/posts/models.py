import os
from uuid import uuid4
from django.db import models

from typing import Final
from custom_auth.models import Author


CAR_IMAGE_FOLDER: Final[str] = "car_images"


def custom_upload_to(_, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{uuid4().hex}{extension}"
    filename = os.path.join(CAR_IMAGE_FOLDER, filename)
    # Return the new filename
    return filename


class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    car_image = models.FileField(upload_to=custom_upload_to)
    price = models.FloatField()
    contact_number = models.CharField(max_length=8)
    author = models.ForeignKey(Author,on_delete=models.CASCADE)

# Generated by Django 5.0.4 on 2024-04-22 20:08

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_post_car_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='car_image',
            field=models.FileField(upload_to=api.models.custom_upload_to),
        ),
    ]

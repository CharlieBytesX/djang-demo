# Generated by Django 5.0.4 on 2024-04-22 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_post_image_name_post_car_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='car_image',
            field=models.FileField(upload_to='custom_upload_to'),
        ),
    ]

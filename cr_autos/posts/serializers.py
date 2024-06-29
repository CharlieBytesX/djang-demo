from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title', 'description', 'contact_number', 'price', 'car_image']
    def create(self,validated_data):
        author = self.context['author']
        post = Post.objects.create(author=author, **validated_data)
        return post

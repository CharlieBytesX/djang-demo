from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverview, name="api-overview"),
    path("list_car_post", views.list_car_posts, name="post-list"),
    path("list_my_car_posts", views.list_my_car_posts, name="my-posts-list"),
    path("list_car_post/<str:pk>", views.car_post_details, name="post-detail"),
    path("update_car_post/<str:pk>", views.update_car_post, name="post-update"),
    path("delete_car_post/<str:pk>", views.delete_car_post, name="post-delete"),
    path("create_car_post", views.create_post, name="post-create"),
    path("verify_account/<str:token>", views.confirm_email, name="confirm-email"),

    path("sign_up", views.register, name="post-create"),
]

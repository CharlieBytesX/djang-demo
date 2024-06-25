from django.urls import path
from . import views

urlpatterns = [
    path("list_car_post", views.list_car_posts, name="post-list"),
    path("list_my_car_posts", views.list_my_car_posts, name="my-posts-list"),
    path("list_car_post/<str:pk>", views.car_post_details, name="post-detail"),
    path("update_car_post/<str:pk>", views.update_car_post, name="post-update"),
    path("delete_car_post/<str:pk>", views.delete_car_post, name="post-delete"),
    path("create_car_post", views.create_post, name="post-create"),
    path("verify_account/<str:token>", views.confirm_email, name="confirm-email"),
    path("sign_up", views.register, name="sign-up"),
    path("sign_in", views.sign_in, name="sign-in"),
    path("logout", views.sign_out, name="sign_out"),
    path("im_logged_in", views.im_logged_in, name="im-logged-in"),
    path("resend_email", views.resend_email, name="resend-email"),
]

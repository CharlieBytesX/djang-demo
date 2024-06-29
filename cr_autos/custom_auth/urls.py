
from django.urls import path
from . import views

urlpatterns = [
    path("verify_account/<str:token>", views.confirm_email, name="confirm-email"),
    path("sign_up", views.register, name="sign-up"),
    path("sign_in", views.sign_in, name="sign-in"),
    path("logout", views.sign_out, name="sign_out"),
    path("im_logged_in", views.im_logged_in, name="im-logged-in"),
    path("resend_email", views.resend_email, name="resend-email"),
]

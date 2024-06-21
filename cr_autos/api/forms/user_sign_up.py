from django import forms
from django.contrib.auth.forms import UserCreationForm
from ..models import Author

class AuthorRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Author
        fields = ('email', 'password1', 'password2')
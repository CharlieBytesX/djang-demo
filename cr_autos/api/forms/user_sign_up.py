from django import forms
from django.contrib.auth.forms import UserCreationForm
from ..models import Author

class AuthorRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Author
        fields = ('email', 'password1', 'password2')
    
    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        
        if password1 and password2 and password1 != password2:
            self.add_error('password2', "The two password fields didn't match.")
        
        return cleaned_data
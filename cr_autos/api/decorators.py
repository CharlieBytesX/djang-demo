from functools import wraps
from typing import Callable
from django.http import HttpRequest, HttpResponse
from rest_framework.response import Response
from rest_framework import status
from .models import Author
from typing import cast

def require_confirmed_author(view_func: Callable) -> Callable:
    @wraps(view_func)
    def _wrapped_view(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        user = cast(Author, request.user)
        print("2")
        if user is None :
            print("a")
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif not user.is_active:  
            print("b")
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        elif not user.is_email_confirmed:
            print("c")
            return Response(status=status.HTTP_403_FORBIDDEN)
        return view_func(request, *args, **kwargs)
    return _wrapped_view

from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.response import Response
from django.conf import settings

def token_required(func):
    def wrapper(self, request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token is None:
            return Response({'error': 'Token no proporcionado'}, status=401)
        
        try:
            access_token = AccessToken(token)
            access_token.payload
        except (InvalidToken, TokenError):
            return Response({'error': 'Token inválido'}, status=401)
        
        return func(self, request, *args, **kwargs)
    return wrapper
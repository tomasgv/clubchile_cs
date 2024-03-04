from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, renderers, generics, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

from datetime import datetime, timedelta

from .serializers import ChileanUserRegisterSerializer, ChileanUserLoginSerializer, ChileanUserSerializer
from .validations import *

# Create your views here.




class UserRegister (APIView):
    
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    
    def post (self, request, format = None):
        valid_data = validation_registration(request.data)
        serializer = ChileanUserRegisterSerializer(data = valid_data)
        
        if serializer.is_valid(raise_exception = True):
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status= status.HTTP_400_BAD_REQUEST)
            

class UserLogin (APIView):
    
    # En
    authentication_classes = [ ]
    permission_classes = [permissions.AllowAny, ]
    
    def post (self, request, format = None):
        
        validated_data = validation_login(request.data)    
        serializer = ChileanUserLoginSerializer(data = validated_data)
        
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(validated_data)
            login(request, user)
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)
    
    

class UserLogout (APIView):
    
    authentication_classes = [ authentication.TokenAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]
    
    
    def post (self, request, format = None):
        logout(request)
        response = Response(status=status.HTTP_200_OK)
        return response
            
            
            
class UserView (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated]
    
    def get (self, request, format = None):     
        serializer = ChileanUserSerializer(request.user)
        
        return Response ( {'user' : serializer.data }, status = status.HTTP_200_OK )
    
    
class TestView (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated]
    
    def post (self, request, format = None):     
        print("Post ha pasado la prueba con el usuario")
        print(request.user)
        
        return Response ( status = status.HTTP_200_OK )
        
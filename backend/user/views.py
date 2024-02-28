from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout

from rest_framework import viewsets, renderers, generics, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

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
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.AllowAny, ]
    
    def post (self, request, format = None):
        
        validated_data = validation_login(request.data)    
        serializer = ChileanUserLoginSerializer(validated_data)
        
        if serializer.is_valid (raise_exception=True):
            user = serializer.check_user(validated_data)
            login(request, user)
            return Response(serializer.data, status= status.HTTP_200_OK)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)
    
    

class UserLogout (APIView):
    def post (self, request, format = None):
        logout(request)
        return Response(status=status.HTTP_200_OK)
            
            
            
class UserView (APIView):
    authentication_classes = [authentication.SessionAuthentication, ]
    permission_classes = [permissions.IsAuthenticated]
    
    def get (self, request, format = None):
        
        pass
        
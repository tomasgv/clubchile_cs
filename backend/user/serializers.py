from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()

class ChileanUserRegisterSerializer (serializers.ModelSerializer):
    
    """ 
    We will use this class to create the user
    """
    class Meta:
        model = UserModel
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password' : {'write_only' : True}}
        
        
    def create(self, validated_data):
        #remember that is also needs the password
        return UserModel.objects.create(**validated_data)
        
        

class ChileanUserLoginSerializer (serializers.Serializer):
    
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(email = clean_data['email'], password=['password'])
        
        print(self.email)
        
        if not user:
            raise ValidationError("User not found")
        return user
    

class ChileanUserSerializer (serializers.ModelSerializer):
    class Meta: 
        model = UserModel
        fields = '__all__'
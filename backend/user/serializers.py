from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()


"""
Serializaer can serialize data or deserialize it

from rest_framework import serializers

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

serializer = CommentSerializer(comment)
serializer.data
# {'email': 'leila@example.com', 'content': 'foo bar', 'created': '2016-01-27T15:17:10.375877'}

from rest_framework.renderers import JSONRenderer

json = JSONRenderer().render(serializer.data)
json
# b'{"email":"leila@example.com","content":"foo bar","created":"2016-01-27T15:17:10.375877"}'

import io
from rest_framework.parsers import JSONParser

stream = io.BytesIO(json)
data = JSONParser().parse(stream)

serializer = CommentSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# {'content': 'foo bar', 'email': 'leila@example.com', 'created': datetime.datetime(2012, 08, 22, 16, 20, 09, 822243)}

"""




class ChileanUserRegisterSerializer (serializers.ModelSerializer):
    
    """ 
    We will use this class to create the user
    """
    class Meta:
        model = UserModel
        fields = ["email", "username", "password"]
        extra_kwargs = {'password' : {'write_only' : True}}
        
        
    def create(self, validated_data):
        #remember that is also needs the password
        user = UserModel.objects.create_user(**validated_data)
        user.save()       
        return user
        

class ChileanUserLoginSerializer (serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        username = clean_data["email"]
        password = clean_data["password"]
        user = authenticate(username = username, password = password)
        if not user:
            raise ValidationError("User not found")
        return user
    

class ChileanUserSerializer (serializers.ModelSerializer):
    class Meta: 
        model = UserModel
        fields = '__all__'
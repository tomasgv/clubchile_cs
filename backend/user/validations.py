from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def validation_registration (data):
    try:
        email = data['email'].strip()
        username = data['username'].strip()
        password = data['password'].strip()
    except KeyError as error:
        raise ValidationError("Missing an attribute for Registration")
    
    if not email or UserModel.objects.filter(email = email).exists():
        raise ValidationError("Choose another email")
    
    if not password or len(password) < 8:
        raise ValidationError("Choose another password, min 8 characters")
    
    if not username or UserModel.objects.filter(username = username).exists():
        raise ValidationError("Choose another username")
    
    return data



def validation_login (data):
    
    try: 
        email = data['email'].strip()
        password = data['password'].strip()
        
    except KeyError as error:
        raise ValidationError("Missing an attribute for Login")
    
    if not email:
        raise ValidationError("Missing email")
    
    if not password:
        raise ValidationError("Missing Password")
    
    return data


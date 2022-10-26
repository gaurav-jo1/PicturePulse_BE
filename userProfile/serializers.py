from rest_framework import serializers
from .models import UserInfo,UserMedia
from django.contrib.auth.models import User

class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = '__all__'
class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name','username')

class UserInfoSerializers(serializers.ModelSerializer):
    user = CurrentUserSerializer(many=False)
    usermedia = UserMediaSerializer(many=True)
    class Meta:
        model = UserInfo
        fields = '__all__'


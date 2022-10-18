from rest_framework import serializers
from .models import UserInfo
from django.contrib.auth.models import User
class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name','username')

class UserInfoSerializers(serializers.ModelSerializer):
    user = CurrentUserSerializer(many=False)
    class Meta:
        model = UserInfo
        fields = '__all__'


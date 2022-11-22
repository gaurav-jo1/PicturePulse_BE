from rest_framework import serializers
from .models import UserInfo, UserMedia
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator


class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'username',)

class UserInfoSerializers(serializers.ModelSerializer):
    user = UserSerializer(many=False, required=True)

    class Meta:
        model = UserInfo
        fields = ('id', 'picture', 'profession', 'user')


    # def update(self, instance, validated_data):
    #     user_validated_data = validated_data.pop('user', None)
    #     user = instance.user  
    #     user.first_name = user_validated_data.get('first_name', user.first_name)
    #     user.username = user_validated_data.get('username', user.username)
    #     user.save()
        
    #     return instance

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name',)
        extra_kwargs = {
            'first_name': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

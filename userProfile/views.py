from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .serializers import UserInfoSerializers, UserMediaSerializer, UserSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions, authentication
from .serializers import RegisterSerializer
from .models import UserInfo
from django.contrib.auth.models import User
from rest_framework import exceptions

# Create your views here.


def front(request):
    context = {}
    return render(request, "index.html", context)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class getUser(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(
            instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getUserInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        print(user)
        userinfos = user.userinfo_set.all()
        serializer = UserInfoSerializers(userinfos, many=True)
        return Response(serializer.data)

    def patch(self, request, format=None):
        user = request.user
        userinfo = UserInfo.objects.get(user=user)
        serializer = UserInfoSerializers(instance=userinfo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getMedia(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        userinfos = user.usermedia_set.all()
        serializer = UserMediaSerializer(userinfos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserMediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

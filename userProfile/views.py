from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .serializers import UserInfoSerializers, UserMediaSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer

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

    def get(self, request):
        user = request.user
        userinfos = user.userinfo_set.all()
        serializer = UserInfoSerializers(userinfos, many=True)
        return Response(serializer.data)


class getMedia(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        userinfos = user.usermedia_set.all()
        serializer = UserMediaSerializer(userinfos, many=True)
        return Response(serializer.data)

    def post(self, request, ):
        serializer = UserMediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
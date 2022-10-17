from django.urls import path

from . import views

from rest_framework_simplejwt.views import ( TokenRefreshView, TokenObtainPairView)

urlpatterns = [
    path('', views.front, name='front'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

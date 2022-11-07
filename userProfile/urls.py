from django.urls import path

from . import views

from rest_framework_simplejwt.views import ( TokenRefreshView, )

urlpatterns = [
    path('', views.front, name='front'),
    path('userinfo/', views.getUser.as_view(), name="UserInfo"),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

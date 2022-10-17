from asyncio.windows_events import NULL
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    profile_picture = models.ImageField(upload_to="profile_pics",null = True)
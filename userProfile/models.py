from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    picture = models.ImageField(upload_to="profile_pics", null=True)
    profession = models.CharField(max_length=200, null=True)

    def __str__(self):
        return "%s's Profile Picture" % self.user


class UserMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    gallery = models.ImageField(upload_to="gallery")


class Meta:
    ordering = ['id']

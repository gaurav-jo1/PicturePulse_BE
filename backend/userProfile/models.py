from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    picture = models.ImageField(upload_to="profile_pics", null=True)
    profession = models.CharField(max_length=200, null=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserInfo.objects.create(user=instance)

    def __str__(self):
        return "%s's Profile Picture" % self.user


class UserMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    gallery = models.ImageField(upload_to="gallery")

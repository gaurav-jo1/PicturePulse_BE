from django.contrib import admin

# Register your models here.
from accounts.models import UserAccount

admin.site.register(UserAccount)
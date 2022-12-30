from django.contrib import admin
from .models import UserInfo, UserMedia

# Register your models here.
admin.site.register(UserInfo)
admin.site.register(UserMedia)
# Generated by Django 4.1.3 on 2022-11-14 05:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userProfile', '0012_alter_usermedia_gallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermedia',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
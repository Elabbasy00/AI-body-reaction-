# Generated by Django 4.2 on 2023-05-27 04:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PoseVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploaded_video', models.FileField(blank=True, null=True, upload_to='videos/')),
                ('compared_video', models.FileField(blank=True, null=True, upload_to='videos/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_pose', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

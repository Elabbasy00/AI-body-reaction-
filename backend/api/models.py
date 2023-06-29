from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class PoseVideo(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_pose")
    original_video = models.FileField(upload_to="videos/", null=True, blank=True)
    uploaded_video = models.FileField(upload_to="videos/", null=True, blank=True)
    compared_video = models.FileField(upload_to="videos/", null=True, blank=True)

    def __str__(self):
        return self.user.username
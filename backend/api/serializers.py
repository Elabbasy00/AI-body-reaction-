from rest_framework import serializers
from .models import PoseVideo


class PoseVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoseVideo
        fields = "__all__"
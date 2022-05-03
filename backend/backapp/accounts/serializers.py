from rest_framework import serializers

from .models import UserAccount


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = "__all__"


class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)
    email = serializers.CharField(max_length=255)

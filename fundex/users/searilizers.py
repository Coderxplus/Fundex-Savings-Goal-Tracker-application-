from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = ["id", "email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer(read_only=True)  
    email = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = ["id", "full_name", "status", "email", "user", "created_at", "updated_at"]
        read_only_fields = ["id", "email", "user", "created_at", "updated_at"]

class Registration
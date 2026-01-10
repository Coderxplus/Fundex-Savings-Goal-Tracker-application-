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

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    full_name = serializers.CharField(max_length=255)

    def validate_email(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]
        full_name = validated_data["full_name"]

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
        )
        Profile.objects.create(
            user=user,
            full_name=full_name,
        )

        return user
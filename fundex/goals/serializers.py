from rest_framework import serializers
from .models import Goal


class GoalSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Goal
		fields = [
			"id",
			"user",
			"name",
			"description",
			"target_amount",
			"current_amount",
			"category",
			"status",
			"created_at",
			"updated_at",
		]
		read_only_fields = ["id", "created_at", "updated_at"]


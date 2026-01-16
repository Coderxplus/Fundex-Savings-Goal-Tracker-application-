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
		read_only_fields = ["id", "created_at", "updated_at", "user"]

	def validate(self, data):
		target = data.get("target_amount", None)
		current = data.get("current_amount", 0)

		if target is not None and current > target:
			raise serializers.ValidationError(
				"Current amount cannot exceed target amount"
			)

		return data


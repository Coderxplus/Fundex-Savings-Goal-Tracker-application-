"""Goal models for tracking user savings objectives."""

import uuid
from users.models import Profile

from django.db import models




class Goal(models.Model):

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="goals", null=False, blank=False)
	name = models.CharField(max_length=255)
	description = models.TextField(blank=True, null=True)
	target_amount = models.DecimalField(max_digits=12, decimal_places=2)
	current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

	CATEGORY_SAVINGS = "savings"
	CATEGORY_EMERGENCY = "emergency"
	CATEGORY_EDUCATION = "education"
	CATEGORY_HOUSING = "housing"
	CATEGORY_OTHER = "other"
	CATEGORY_CHOICES = (
		(CATEGORY_SAVINGS, "Savings"),
		(CATEGORY_EMERGENCY, "Emergency"),
		(CATEGORY_EDUCATION, "Education"),
		(CATEGORY_HOUSING, "Housing"),
		(CATEGORY_OTHER, "Other"),
	)

	category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default=CATEGORY_OTHER)

	STATUS_ACTIVE = "active"
	STATUS_COMPLETED = "completed"
	STATUS_CLOSED = "closed"
	STATUS_CHOICES = (
		(STATUS_ACTIVE, "Active"),
		(STATUS_COMPLETED, "Completed"),
		(STATUS_CLOSED, "Closed"),
	)

	status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_ACTIVE)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self) -> str:

		return f"{self.name} ({self.user.email})"

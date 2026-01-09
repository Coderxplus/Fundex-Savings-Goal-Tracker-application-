"""Transactions models implementing immutable financial events and goal updates."""

import uuid
from decimal import Decimal
from django.db import transaction as db_transaction

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import F
from django.utils import timezone

from fundex.users.models import Profile
from fundex.goals.models import Goal


class Transaction(models.Model):
    """Immutable transaction event linked to a user and optional goal.

    Rules:
    - Transactions are immutable after creation (no updates allowed).
    - Deposits increase balances; withdrawals decrease balances.
    - If linked to a goal, the goal's `current_amount` is updated on create.
    """

    TYPE_DEPOSIT = "deposit"
    TYPE_WITHDRAWAL = "withdrawal"
    TYPE_CHOICES = (
        (TYPE_DEPOSIT, "Deposit"),
        (TYPE_WITHDRAWAL, "Withdrawal"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="transactions")
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name="transactions", null=True, blank=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.CharField(max_length=255)
    transaction_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-transaction_date', '-created_at']

    def clean(self):
        if self.amount <= 0:
            raise ValidationError("Transaction amount must be positive")

    def save(self, *args, **kwargs):
        """Create-only save; apply balance effects atomically on create."""
        self.full_clean()  # ensures `clean()` runs before saving

        creating = self.pk is None
        if not creating:
            raise ValidationError("Transactions are immutable after creation")

        with db_transaction.atomic():
            super().save(*args, **kwargs)
            if self.goal_id:
                delta = self.amount if self.type == self.TYPE_DEPOSIT else -self.amount
                Goal.objects.filter(pk=self.goal_id).update(current_amount=F("current_amount") + delta)

    def __str__(self) -> str:
        goal_name = f" for {self.goal.name}" if self.goal else ""
        return f"{self.type} {self.amount} by {self.user.email}{goal_name} on {self.transaction_date:%Y-%m-%d %H:%M}"

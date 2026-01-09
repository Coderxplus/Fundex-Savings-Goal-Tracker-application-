"""Transaction serializers for API endpoints."""

from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transaction model with validation and read-only enforcement."""
    
    user_email = serializers.EmailField(source='user.email', read_only=True)
    goal_name = serializers.CharField(source='goal.name', read_only=True, allow_null=True)
    
    class Meta:
        model = Transaction
        fields = [
            'id',
            'user',
            'user_email',
            'goal',
            'goal_name',
            'type',
            'amount',
            'description',
            'transaction_date',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at', 'user_email', 'goal_name']
    
    def validate_amount(self, value):
        """Ensure transaction amount is positive."""
        if value <= 0:
            raise serializers.ValidationError("Transaction amount must be positive.")
        return value
    
    def validate_type(self, value):
        """Ensure transaction type is valid."""
        if value not in [Transaction.TYPE_DEPOSIT, Transaction.TYPE_WITHDRAWAL]:
            raise serializers.ValidationError(
                f"Invalid transaction type. Must be '{Transaction.TYPE_DEPOSIT}' or '{Transaction.TYPE_WITHDRAWAL}'."
            )
        return value
    
    def update(self, instance, validated_data):
        """Prevent updates to transactions (immutable)."""
        raise serializers.ValidationError("Transactions are immutable and cannot be updated.")

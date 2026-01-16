from django.shortcuts import render
from .models import Transaction
from .serializer import TransactionSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated



# Create your views here.

class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user.profile)

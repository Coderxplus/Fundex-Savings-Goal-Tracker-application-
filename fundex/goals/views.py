from django.shortcuts import render
from goals.models import Goal
from goals.serializers import GoalSerializer

# Create your views here.


from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Goal
from .serializers import GoalSerializer

class GoalViewSet(ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user.profile)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user.profile)


    
from rest_framework.routers import DefaultRouter
from .views import GoalViewSet

router = DefaultRouter()
router.register(r'goals', GoalViewSet, basename='goals')

urlpatterns = router.urls
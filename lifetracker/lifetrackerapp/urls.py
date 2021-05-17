from rest_framework import routers 
from .api import ActivityInstanceViewSet

routers = routers.DefaultRouter()
routers.register('api/activity-instances', ActivityInstanceViewSet, 'activity-instances')

urlpatterns = routers.urls
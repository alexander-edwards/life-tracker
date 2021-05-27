from rest_framework import routers
from .api import ActivityInstanceViewSet, UserInstanceViewSet

routers = routers.DefaultRouter()
routers.register('api/activity-instances',
                 ActivityInstanceViewSet, 'activity-instances')
routers.register('api/users', UserInstanceViewSet, 'user-instances')

urlpatterns = routers.urls

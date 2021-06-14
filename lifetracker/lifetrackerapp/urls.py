from rest_framework import routers
from .api import ActivityInstanceViewSet, UserInstanceViewSet, DayInstanceViewSet

routers = routers.DefaultRouter()

routers.register('api/activity-instances',
                 ActivityInstanceViewSet,
                 'activity-instances')
routers.register('api/users',
                 UserInstanceViewSet,
                 'user-instances')
routers.register('api/days',
                 DayInstanceViewSet,
                 'day-instances')

urlpatterns = routers.urls

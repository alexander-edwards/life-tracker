from lifetrackerapp.models import ActivityInstance
from rest_framework import viewsets, permissions
from .serializers import ActivityInstanceSerializer

# Viewsets create routes automatically i.e. post/put request

class ActivityInstanceViewSet(viewsets.ModelViewSet):
    queryset = ActivityInstance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActivityInstanceSerializer
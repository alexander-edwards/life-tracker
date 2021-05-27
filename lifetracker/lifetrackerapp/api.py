from lifetrackerapp.models import ActivityInstance, UserInstance
from rest_framework import viewsets, permissions
from .serializers import ActivityInstanceSerializer, UserInstanceSerializer

# Viewsets create routes automatically i.e. post/put request


class ActivityInstanceViewSet(viewsets.ModelViewSet):
    queryset = ActivityInstance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActivityInstanceSerializer


class UserInstanceViewSet(viewsets.ModelViewSet):
    queryset = UserInstance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserInstanceSerializer

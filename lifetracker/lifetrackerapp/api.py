from lifetrackerapp.models import ActivityInstance, UserInstance, DayInstance
from rest_framework import viewsets, permissions
from .serializers import ActivityInstanceSerializer, UserInstanceSerializer, DayInstanceSerializer

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


class DayInstanceViewSet(viewsets.ModelViewSet):
    queryset = DayInstance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DayInstanceSerializer

    def get_object(self):
        if self.request.method == 'PUT':
            obj, created = DayInstance.objects.get_or_create(
                pk=self.kwargs.get('pk'),
                bin_activities_done=[])
            return obj
        else:
            return super(DayInstanceViewSet, self).get_object()

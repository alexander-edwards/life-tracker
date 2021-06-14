from rest_framework import serializers
from lifetrackerapp.models import ActivityInstance, UserInstance, DayInstance


class ActivityInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityInstance
        fields = '__all__'


class UserInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInstance
        fields = '__all__'


class DayInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayInstance
        fields = '__all__'

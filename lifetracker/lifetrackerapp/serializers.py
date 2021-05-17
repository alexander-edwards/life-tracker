from rest_framework import serializers
from lifetrackerapp.models import ActivityInstance

class ActivityInstanceSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = ActivityInstance
        fields = '__all__'
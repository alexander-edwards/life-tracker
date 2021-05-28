from django.db import models

# Create your models here.


class ActivityInstance(models.Model):

    activity = models.CharField(max_length=100)
    begin_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration_mins = models.IntegerField()
    notes = models.CharField(max_length=1000, null=True, blank=True)


class UserInstance(models.Model):

    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    activity_types = models.JSONField()

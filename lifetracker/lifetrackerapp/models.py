from django.db import models

# Create your models here.

class ActivityInstance(models.Model):

    activity = models.CharField(max_length = 100)
    begin_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration_mins = models.IntegerField()
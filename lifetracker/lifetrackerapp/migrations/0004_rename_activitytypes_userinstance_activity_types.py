# Generated by Django 3.2.3 on 2021-05-26 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lifetrackerapp', '0003_userinstance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userinstance',
            old_name='activityTypes',
            new_name='activity_types',
        ),
    ]

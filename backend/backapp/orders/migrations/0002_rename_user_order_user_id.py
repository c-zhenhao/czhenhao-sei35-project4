# Generated by Django 4.0.4 on 2022-05-05 18:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='user',
            new_name='user_id',
        ),
    ]

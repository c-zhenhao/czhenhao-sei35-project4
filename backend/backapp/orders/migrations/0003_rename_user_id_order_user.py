# Generated by Django 4.0.4 on 2022-05-05 18:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_rename_user_order_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='user_id',
            new_name='user',
        ),
    ]

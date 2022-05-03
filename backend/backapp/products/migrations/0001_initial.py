# Generated by Django 4.0.4 on 2022-05-03 08:18

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=1000, null=True)),
                ('imgUrl', models.TextField(max_length=1000, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('priceEnd', models.DecimalField(decimal_places=2, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('priceCurrent', models.DecimalField(decimal_places=2, max_digits=6, validators=[django.core.validators.MinValueValidator(0)])),
                ('dateStart', models.DateTimeField(auto_now_add=True)),
                ('dateEnd', models.DateTimeField()),
                ('stock', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('stockStatus', models.CharField(choices=[('INSTOCK', 'In stock'), ('OOS', 'Out of stock')], default='INSTOCK', max_length=10)),
                ('isActive', models.BooleanField(default=True)),
            ],
        ),
    ]
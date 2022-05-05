from django.db import models
from django.core.validators import MinValueValidator


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000, blank=True, null=True)
    imgUrl = models.TextField(max_length=1000, null=True)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])
    # priceEnd = models.DecimalField(
    #    max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])
    # priceCurrent = models.DecimalField(
    #    max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])
    dateStart = models.DateTimeField(auto_now_add=True, null=True,)
    dateEnd = models.DateTimeField(blank=True, null=True)
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    stockStart = models.IntegerField(
        default=0, validators=[MinValueValidator(0)])
    stockStatus = models.CharField(max_length=10, default="INSTOCK", choices=[
        ("INSTOCK", "In stock"), ("OOS", "Out of stock")])
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.name

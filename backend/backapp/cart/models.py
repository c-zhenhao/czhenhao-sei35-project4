from django.db import models
from django.core.validators import MinValueValidator

from accounts.models import UserAccount
from products.models import Product


class CartItem(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(
        max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.id

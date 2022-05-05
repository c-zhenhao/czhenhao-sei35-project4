from django.db import models
from django.core.validators import MinValueValidator

from accounts.models import UserAccount
from products.models import Product


class Order(models.Model):
    user = models.ForeignKey(
        UserAccount, on_delete=models.SET_NULL, null=True)
    order_status = models.CharField(max_length=20, default="PENDING", choices=[("PENDING", "Pending"), ("PROCESSING", "Processing"), (
        "INTRANSIT", "In Transit"), ("WAITING", "Waiting Collection"), ("COMPLETED", "Completed"), ("CANCELLED", "Cancelled")])
    order_created_time = models.DateTimeField(auto_now_add=True)
    order_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}-{}-{}-{}".format(self.user, self.order_status, self.order_created_time, self.order_updated_time)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(
        max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return "{}-{}-{}-{}".format(self.id, self.product, self.quantity, self.price)

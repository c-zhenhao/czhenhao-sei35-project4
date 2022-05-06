from django.urls import path

from cart.views import CartItemCreateAPIView, CartItemByUserAPIView

urlpatterns = [
    path("", CartItemCreateAPIView.as_view()),
    path("delete/<str:userId>", CartItemCreateAPIView.as_view()),
    path("<str:userId>", CartItemByUserAPIView.as_view())
]

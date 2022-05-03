from django.urls import path

from orders.views import OrderGenericAPIView, OrderDetailsAPIView, OrderDetailsItemAPIView

urlpatterns = [
    path("", OrderGenericAPIView.as_view()),
    path("<str:pk>", OrderGenericAPIView.as_view()),
    path("details/<str:orderId>", OrderDetailsAPIView.as_view()),
    path("orderitems/<str:orderId>", OrderDetailsItemAPIView.as_view()),
]

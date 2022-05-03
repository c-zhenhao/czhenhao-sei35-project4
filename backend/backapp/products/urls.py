from django.urls import path

from products.views import ProductGenericAPIView

urlpatterns = [
    path("", ProductGenericAPIView.as_view()),
    path("<str:pk>", ProductGenericAPIView.as_view()),
]

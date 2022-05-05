from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from products.models import Product
from cart.models import CartItem
from cart.serializers import CartItemSerializer


class CartItemCreateAPIView(APIView):

    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        user = request.data.get("user")
        quantity = request.data.get("quantity")
        price = request.data.get("price")
        product = Product.objects.get(id=request.data.get("product"))

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartItemByUserAPIView(APIView):

    # get the whole object first, then filter by id
    def get_cartitems(self, userId):
        try:
            return CartItem.objects.filter(user_id=userId)
        except CartItem.DoesNotExist:
            raise Http404

    def get(self, request, userId):
        cartitems = self.get_cartitems(userId)
        serializer = CartItemSerializer(cartitems, many=True)
        return Response(serializer.data)

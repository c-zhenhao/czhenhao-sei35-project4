from django.http import Http404

from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response

from orders.models import Order, OrderItem

from orders.serializers import OrderSerializer, OrderItemSerializer


# API to see orders
class OrderGenericAPIView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # get all order information or only 1 order by id
    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        return self.list(request)

    # post (create) order information - to bind to user, i.e user: 3
    def post(self, request, pk=None):
        response = self.create(request)
        return response

    # patch (update) order information ?
    def patch(self, request, pk=None):
        response = self.partial_update(request, pk)
        return response

    # delete order totally (probs wont use)
    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        return response


# API to see order details by order id
class OrderDetailsAPIView(APIView):

    # 1. get order first
    def get_order(self, orderId):
        try:
            return Order.objects.get(id=orderId)
        except Order.DoesNotExist:
            raise Http404

    # 2. get the actual order after serializing
    def get(self, request, orderId):
        order = self.get_order(orderId)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    # 3. update the specific order
    # delete this?
    def patch(self, request, orderId):
        order = self.get_order(orderId)
        serializer = OrderSerializer(order, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API to get the order details
class OrderDetailsItemAPIView(APIView):

    # 1. function to get the orderitem from db
    def get_orderitems(self, orderId):
        try:
            return OrderItem.objects.filter(order_id=orderId)
        except OrderItem.DoesNotExist:
            raise Http404

    # 2. ENDPOINT to get the order items inside the order id
    def get(self, request, orderId):
        orderitems = self.get_orderitems(orderId)
        serializer = OrderItemSerializer(orderitems, many=True)
        return Response(serializer.data)

    # 3. create items to the order
    def post(self, request, orderId):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

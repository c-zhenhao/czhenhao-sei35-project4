from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response

from products.models import Product

from products.serializers import ProductSerializer


class ProductGenericAPIView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # get product information
    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)

        return self.list(request)

    # post (create) product information
    def post(self, request, pk=None):
        response = self.create(request)
        return response

    # patch (update) product information
    def patch(self, request, pk=None):
        response = self.partial_update(request, pk)
        return response

    # delete product totally
    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        return response

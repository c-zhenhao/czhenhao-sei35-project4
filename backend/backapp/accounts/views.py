from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import authenticate, login

from .models import UserAccount

from .serializers import UserAccountSerializer, TokenSerializer

# JWT settings
# https://medium.com/django-rest/logout-django-rest-framework-eb1b53ac6d35
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken


class LoginView(generics.ListCreateAPIView):
    """
    POST accounts/login/
    """

    # This permission class will overide the global permission class setting
    # Permission checks are always run at the very start of the view, before any other code is allowed to proceed.
    # The permission class here is set to AllowAny, which overwrites the global class to allow anyone to have access to login.
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()

    def post(self, request, *args, **kwargs):
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, user)
            refresh = RefreshToken.for_user(user)
            serializer = TokenSerializer(data={
                # using DRF JWT utility functions to generate a token
                "token": str(refresh.access_token)
            })
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SignupView(generics.ListCreateAPIView):
    """
    POST accounts/signup/
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserAccountSerializer
    queryset = UserAccount.objects.all()

    def post(self, request, *args, **kwargs):
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        if not email or not password:
            return Response(data={"message": "email and password is required to register a user"}, status=status.HTTP_400_BAD_REQUEST)
        new_user = UserAccount.objects.create_user(
            email=email, password=password
        )
        return Response(status=status.HTTP_201_CREATED)


# get user object by email
class UserbyEmailAPIView(APIView):

    def get(self, request, email):
        try:
            user = UserAccount.objects.get(email=email)
        except:
            return Response({"status": "help"})

        serializer = UserAccountSerializer(user)
        return Response(serializer.data)


# get user object by id
class UserbyIdAPIView(APIView):

    def get(self, request, userId):
        try:
            user = UserAccount.objects.get(id=userId)
        except:
            return Response({"status": "djangone"})

        serializer = UserAccountSerializer(user)
        return Response(serializer.data)


# get all users
class UserAllAPIView(APIView):

    def get(self, request):
        users = UserAccount.objects.all()
        serializer = UserAccountSerializer(users, many=True)
        return Response(serializer.data)

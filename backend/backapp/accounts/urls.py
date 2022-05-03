from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from . import views

urlpatterns = [
    path("token/", jwt_views.TokenObtainPairView.as_view(),
         name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(),
         name="token_refresh"),
    path("login/", views.LoginView.as_view(), name="auth-login"),
    path("signup/", views.SignupView.as_view(), name="user-signup"),
    path("user/", views.UserAllAPIView.as_view()),
    path("user/<str:email>/", views.UserbyEmailAPIView.as_view()),
    path("userid/<str:userId>/", views.UserbyIdAPIView.as_view()),
]

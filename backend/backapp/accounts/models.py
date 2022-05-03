from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.is_buyer = True
        user.is_seller = False
        user.save(using=self._db)

        return user

    def create_seller(self, email, password=None):
        user = self.create_user(email, password)

        user.is_buyer = False
        user.is_seller = True
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)

        user.is_superuser = True
        user.is_buyer = True
        user.is_seller = True
        user.is_staff = True
        user.is_admin = True

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(verbose_name="email",
                              max_length=255, unique=True)
    profileImg = models.TextField(max_length=1000, blank=True, null=True)
    password = models.CharField(max_length=255)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField("staff status", default=False)
    is_admin = models.BooleanField("admin status", default=False)
    is_superuser = models.BooleanField("superuser status", default=False)
    is_buyer = models.BooleanField("buyer status", default=False)
    is_seller = models.BooleanField("seller status", default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}"

from django.contrib.auth import authenticate, get_user_model
from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer, UserSerializer
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


User = get_user_model()


class CustomTokenCreateSerializer(TokenCreateSerializer):
    def validate(self, attrs):
        password = attrs.get("password")
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail("invalid_credentials")
        # We changed only below line
        if self.user:  # and self.user.is_active:
            return attrs
        self.fail("invalid_credentials")


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('id', 'username', 'email', 'password', "first_name", "last_name")


class CurrentUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id', 'username', 'email',"first_name", "last_name",
                  'is_staff', 'is_superuser')

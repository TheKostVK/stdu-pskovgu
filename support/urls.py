from django.urls import path
from django.contrib.auth.views import LogoutView

from .views import (
    SupportDetailView,
)


urlpatterns = [
    path('', SupportDetailView.as_view(), name='support'),
]


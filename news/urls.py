from django.urls import path
from django.contrib.auth.views import LogoutView

from .views import (
    NewsDetailView,
)


urlpatterns = [
    path('', NewsDetailView.as_view(), name='news'),
]


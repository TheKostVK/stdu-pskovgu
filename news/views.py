from django.shortcuts import render
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import DetailView, View
from django.views.generic import ListView
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


class NewsDetailView(DetailView):

    def get(self, request, *args, **kwargs):
        return render(request, 'ui_interface/news.html')

import datetime
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import DetailView, View
from django.views.generic import ListView
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import login, authenticate
from django.views.generic import TemplateView, ListView

from .models import NewsItem


class NewsDetailView(View):

    def get(self, request, *args, **kwargs):
        news_item = NewsItem.objects.all()
        context = {
            'news_item': news_item,
        }
        return render(request, 'ui_interface/news.html', context)

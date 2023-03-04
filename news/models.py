from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db.models.aggregates import Count
from random import randint
from django.contrib.auth.models import User

User = get_user_model()


class NewsItem(models.Model):

    active = models.BooleanField(default=True, verbose_name='Активировать')

    title = models.CharField(max_length=255, verbose_name='Заголовок новости')
    url_news = models.CharField(max_length=255, verbose_name='url', default='ui_interface/news/.html')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Заголовок новости URL поиска')
    news_image = models.ImageField(upload_to='static/images/news'.strip('/'), verbose_name='Изображение')
    price = models.CharField(max_length=255, verbose_name='Условная единица', default=10)
    old_price = models.CharField(max_length=255, verbose_name='Условная единица', default=1)

    def get_instance(self, request):
        try:
            object_id = request.resolver_match.kwargs['object_id']
            obj = self.get_object(request, object_id)
        except:
            obj = None
        return obj

    def __str__(self):
        return self.title

    def random(self):
        count = self.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'slug': self.slug})

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

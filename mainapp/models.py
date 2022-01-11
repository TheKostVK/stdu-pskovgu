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


class Category(models.Model):

    name = models.CharField(max_length=255, verbose_name='Название факультета')
    ordinal_place = models.CharField(max_length=255, verbose_name='Порядковое место в списке факультетов', default=1)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'slug': self.slug})

    class Meta:
        verbose_name = 'Факультет'
        verbose_name_plural = 'Факультеты'


class Product(models.Model):

    category = models.ForeignKey(Category, verbose_name='Факультет', on_delete=models.CASCADE)

    active = models.BooleanField(default=True, verbose_name='Активировать')

    title = models.CharField(max_length=255, verbose_name='Номер группы')
    url_table = models.CharField(max_length=255, verbose_name='url', default='ui_interface/tables/.html')
    url_all_tables = models.CharField(max_length=255, verbose_name='url', default='ui_interface/full_tables/f.html')
    slug = models.SlugField(unique=True, blank=True, verbose_name='Номер группы для URL поиска')
    fac = models.CharField(verbose_name='Курс', max_length=20, choices=[('Первый курс', '1'), ('Второй курс', '2'), ('Третий курс', '3'), ('Четвертый курс', '4'), ('Пятый курс', '5'), ('Шестой курс', '6'), ('Седьмой курс', '7'), ('Восьмой курс', '8')])
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
        return reverse('product_detail', kwargs={'slug': self.slug})

    class Meta:
        verbose_name = 'Таблица Расписания'
        verbose_name_plural = 'Таблица Расписаний'


class SlideProduct(models.Model):

    product = models.ForeignKey(Product, verbose_name='Товар', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='/images/banners'.strip('/'), verbose_name='Изображение')

    def __str__(self):
        return self.product.title

    def get_absolute_url(self):
        return reverse('product_detail', kwargs={'slug': self.product.slug})

    def get_features(self):
        return {f.feature.feature_name: ' '.join([f.value, f.feature.unit or ""]) for f in self.features.all()}

    class Meta:
        verbose_name = 'Слайдер'
        verbose_name_plural = 'Слайдеры'


class CartProduct(models.Model):

    user = models.ForeignKey('Customer', verbose_name='Пользователь', on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart', verbose_name='Отслеживаемое', on_delete=models.CASCADE, related_name='related_products')
    product = models.ForeignKey(Product, verbose_name='Расписание', on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)

    def __str__(self):
        return "Расписание: {} (для отслеж)".format(self.product.title)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Расписание в отлеживаемом'
        verbose_name_plural = 'Расписание в отслеживаемом'


class Cart(models.Model):

    owner = models.ForeignKey('Customer', null=True, verbose_name='Пользователь', on_delete=models.CASCADE)
    products = models.ManyToManyField(CartProduct, blank=True, related_name='related_cart')
    total_products = models.PositiveIntegerField(default=0, verbose_name='всего расписаний')
    in_order = models.BooleanField(default=False)
    for_anonymous_user = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Отслеживание'
        verbose_name_plural = 'Отслеживание'


class Customer(models.Model):

    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)

    def __str__(self):
        return "{} - {}".format(self.user, self.user.email)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
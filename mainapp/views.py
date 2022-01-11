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

from .forms import LoginForm, RegistrationForm
from .models import Category, Customer, Cart, CartProduct, Product, SlideProduct
from .mixins import CartMixin
from .utils import recalc_cart


class MyQ(Q):
    default = 'OR'


class BaseView(CartMixin, View):

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        products = Product.objects.all()
        slideproducts = SlideProduct.objects.all()
        context = {
            'categories': categories,
            'products': products,
            'cart': self.cart,
            'slideproducts': slideproducts,
        }
        return render(request, 'ui_interface/index.htm', context)


class AddToCartView(CartMixin, View):

    def get(self, request, *args, **kwargs):
        product_slug = kwargs.get('slug')
        product = Product.objects.get(slug=product_slug)
        cart_product, created = CartProduct.objects.get_or_create(
            user=self.cart.owner, cart=self.cart, product=product
        )
        if created:
            self.cart.products.add(cart_product)
        messages.add_message(request, messages.INFO, "Товар успешно добавлен")
        return HttpResponseRedirect('/')


class DeleteFromCartView(CartMixin, View):

    def get(self, request, *args, **kwargs):
        product_slug = kwargs.get('slug')
        product = Product.objects.get(slug=product_slug)
        cart_product = CartProduct.objects.get(
            user=self.cart.owner, cart=self.cart, product=product
        )
        self.cart.products.remove(cart_product)
        cart_product.delete()
        messages.add_message(request, messages.INFO, "Товар успешно удален")
        return HttpResponseRedirect('/cart/')


class ChangeQTYView(CartMixin, View):

    def post(self, request, *args, **kwargs):
        product_slug = kwargs.get('slug')
        product = Product.objects.get(slug=product_slug)
        cart_product = CartProduct.objects.get(
            user=self.cart.owner, cart=self.cart, product=product
        )
        qty = int(request.POST.get('qty'))
        cart_product.qty = qty
        cart_product.save()
        messages.add_message(request, messages.INFO, "Кол-во успешно изменено")
        return HttpResponseRedirect('/cart/')


class CartView(CartMixin, View):

    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        categories = Category.objects.all()
        context = {
            'products': products,
            'cart': self.cart,
            'categories': categories
        }
        return render(request, 'ui_interface/cart.html', context)


class CatalogView(DetailView):

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        products = Product.objects.all()
        context = {
            'categories': categories,
            'products': products,
        }
        return render(request, 'ui_interface/catalog.html', context)


class ProductDetailView(CartMixin, DetailView):
    model = Product
    context_object_name = 'product'
    template_name = 'ui_interface/product_detail.html'
    slug_url_kwarg = 'slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = Product.objects.all()
        context['cart'] = self.cart
        context['categories'] = self.get_object().category.__class__.objects.all()
        return context


class ListgroupDetailView(CartMixin, DetailView):

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        products = Product.objects.all()
        slideproducts = SlideProduct.objects.all()
        context = {
            'categories': categories,
            'products': products,
            'cart': self.cart,
            'slideproducts': slideproducts,
        }
        return render(request, 'ui_interface/list_group.html', context)


class TimetableDetailView(CartMixin, DetailView):

    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        products = Product.objects.all()
        slideproducts = SlideProduct.objects.all()
        context = {
            'categories': categories,
            'products': products,
            'cart': self.cart,
            'slideproducts': slideproducts,
        }
        return render(request, 'ui_interface/timetable.html', context)


class CategoryDetailView(DetailView):
    model = Category
    queryset = Category.objects.all()
    context_object_name = 'category'
    template_name = 'ui_interface/category_detail.html'
    slug_url_kwarg = 'slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        query = self.request.GET.get('search')
        category = self.get_object()
        context['cart'] = self.cart
        context['categories'] = self.model.objects.all()
        if not query and not self.request.GET:
            context['category_products'] = category.product_set.all()
            return context
        if query:
            products = category.product_set.filter(Q(title__icontains=query))
            context['category_products'] = products
            return context
        url_kwargs = {}
        for item in self.request.GET:
            if len(self.request.GET.getlist(item)) > 1:
                url_kwargs[item] = self.request.GET.getlist(item)
            else:
                url_kwargs[item] = self.request.GET.get(item)
        q_condition_queries = Q()
        for key, value in url_kwargs.items():
            if isinstance(value, list):
                q_condition_queries.add(Q(**{'value__in': value}), Q.OR)
            else:
                q_condition_queries.add(Q(**{'value': value}), Q.OR)
        pf = ProductFeatures.objects.filter(
            q_condition_queries
        ).prefetch_related('product', 'feature').values('product_id')
        products = Product.objects.filter(id__in=[pf_['product_id'] for pf_ in pf])
        context['category_products'] = products
        return context


def authenticate_user(email, password):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None
    else:
        if user.check_password(password):
            return user

    return None


class LoginView(View):
    template_name = 'ui_interface/login.html'

    def get(self, request, *args, **kwargs):

        form = LoginForm(request.POST or None)
        context = {
            'form': form,
        }
        return render(request, 'ui_interface/login.html', context)

    def post(self, request):
        form = LoginForm(request.POST or None)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate_user(email, password)
            context = {}

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/')
                else:
                    context['error_message'] = "user is not active"
            else:
                context['error_message'] = "Пользователь не найден или неверный пароль"

            return render(request, self.template_name, context)
        context = {
            'form': form
        }
        return render(request, 'ui_interface/login.html', context)


class RegistrationView(View):

    def get(self, request, *args, **kwargs):
        form = RegistrationForm(request.POST or None)
        context = {
            'form': form,
        }
        return render(request, 'ui_interface/registration.html', context)

    def post(self, request, *args, **kwargs):
        form = RegistrationForm(request.POST or None)
        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.username = form.cleaned_data['username']
            new_user.email = form.cleaned_data['username']
            new_user.save()
            new_user.set_password(form.cleaned_data['password'])
            new_user.save()
            Customer.objects.create(
                user=new_user
            )
            user = authenticate(
                username=new_user.username, password=form.cleaned_data['password']
            )
            login(request, user)
            return HttpResponseRedirect('/list-group/')
        context = {
            'form': form,
        }
        return render(request, 'ui_interface/registration.html', context)


class ProfileView(CartMixin, View):

    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        categories = Category.objects.all()
        return render(
            request,
            'ui_interface/profile.html',
            {'products': products, 'categories': categories, 'cart': self.cart,}
        )


class SearchResultsView(ListView):
    model = Product
    template_name = 'ui_interface/search_results.html'

    def get_queryset(self):
        query = self.request.GET.get('q')
        object_list = Product.objects.filter(Q(title__icontains=query) | Q(key_words_search__icontains=query))
        return object_list

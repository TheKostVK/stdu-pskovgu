from django.urls import path
from django.contrib.auth.views import LogoutView

from .views import (
    BaseView,
    ProductDetailView,
    CategoryDetailView,
    CartView,
    AddToCartView,
    DeleteFromCartView,
    ChangeQTYView,
    LoginView,
    RegistrationView,
    ProfileView,
    CatalogView,
    SearchResultsView,
    ListgroupDetailView,
    TimetableDetailView,
)


urlpatterns = [
    path('', BaseView.as_view(), name='base'),
    path('catalog/', CatalogView.as_view(), name='catalog'),
    path('tables/<str:slug>/', ProductDetailView.as_view(), name='product_detail'),
    path('category/<str:slug>/', CategoryDetailView.as_view(), name='category_detail'),
    path('cart/', CartView.as_view(), name='cart'),
    path('add-to-cart/<str:slug>/', AddToCartView.as_view(), name='add_to_cart'),
    path('remove-from-cart/<str:slug>/', DeleteFromCartView.as_view(), name='delete_from_cart'),
    path('change-qty/<str:slug>/', ChangeQTYView.as_view(), name='change_qty'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page="/"), name='logout'),
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('search/', SearchResultsView.as_view(), name='search_results'),
    path('timetable/', TimetableDetailView.as_view(), name='timetable'),
    path('list-group/', ListgroupDetailView.as_view(), name='list_group'),
]


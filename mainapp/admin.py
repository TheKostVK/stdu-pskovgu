from django.contrib import admin

from .models import *


class ProductAdmin(admin.ModelAdmin):
    change_form_template = 'custom_admin/change_form.html'


class OrderAdmin(admin.ModelAdmin):
    list_display = ('status', 'created_at', 'order_date')
    list_filter = ('status', 'created_at', 'order_date')


admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(CartProduct)
admin.site.register(Cart)
admin.site.register(Product, ProductAdmin)
admin.site.register(SlideProduct)

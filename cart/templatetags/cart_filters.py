from django import template
register = template.Library()

@register.filter(name='get_quantity')
def get_cart_quantity(cart, movie_id):
    return cart[str(movie_id)]

@register.filter(name='get_total_price')
def get_total_price(cart, movie_id):
    return cart[str(movie_id)] * get_cart_quantity(cart, movie_id)

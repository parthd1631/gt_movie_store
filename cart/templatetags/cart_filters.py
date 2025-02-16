from django import template
register = template.Library()

@register.filter(name='get_quantity')
def get_cart_quantity(cart, movie_id):
    if not isinstance(cart, dict):
        return 0
    return int(cart.get(str(movie_id), 0))

@register.filter(name='get_total_price')
def get_total_price(cart, movie_id):
    return cart[str(movie_id)] * get_cart_quantity(cart, movie_id)

@register.filter(name='multiply')
def multiply(value, arg):
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return 0
    

@register.filter
def multiply(value, arg):
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return 0

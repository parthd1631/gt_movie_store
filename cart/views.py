from django.shortcuts import render, get_object_or_404, redirect
from movies.models import Movie
from .utils import calculate_cart_total
from .models import Order, Item
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    if not isinstance(request.session.get('cart'), dict):
        request.session['cart'] = {}
    
    cart = request.session['cart']
    movies_in_cart = []
    cart_total = 0
    
    # Get all movies in cart
    movie_ids = [int(id) for id in cart.keys()]
    if movie_ids:
        movies_in_cart = Movie.objects.filter(id__in=movie_ids)
        
        # Calculate total
        for movie in movies_in_cart:
            quantity = int(cart.get(str(movie.id), 0))
            cart_total += movie.price * quantity
    
    template_data = {
        'title': 'Shopping Cart',
        'movies_in_cart': movies_in_cart,
        'cart_total': "{:.2f}".format(cart_total)
    }
    
    return render(request, 'cart/index.html', {'template_data': template_data})

@login_required
def add(request, id):
    movie = get_object_or_404(Movie, id=id)
    
    # Initialize cart as dictionary if not exists or is invalid
    if not isinstance(request.session.get('cart'), dict):
        request.session['cart'] = {}
    
    cart = request.session['cart']
    quantity = int(request.POST.get('quantity', 1))  # Default to 1 if not specified
    
    # Store movie ID as string (session serialization requirement)
    cart[str(id)] = quantity
    request.session['cart'] = cart
    
    return redirect('cart.index')

@login_required
def clear(request):
    request.session['cart'] = {}
    return redirect('cart.index')

@login_required
def purchase(request):
    if not isinstance(request.session.get('cart'), dict):
        request.session['cart'] = {}
        return redirect('cart.index')
    
    cart = request.session['cart']
    if not cart:
        return redirect('cart.index')
    
    # Create order
    movie_ids = [int(id) for id in cart.keys()]
    movies = Movie.objects.filter(id__in=movie_ids)
    
    order = Order()
    order.user = request.user
    order.total = calculate_cart_total(cart, movies)
    order.save()
    
    # Create order items
    for movie in movies:
        quantity = int(cart[str(movie.id)])
        Item.objects.create(
            order=order,
            movie=movie,
            price=movie.price,
            quantity=quantity
        )
    
    # Clear the cart
    request.session['cart'] = {}
    
    return render(request, 'cart/purchase.html', {
        'template_data': {
            'title': 'Purchase confirmation',
            'order_id': order.id
        }
    })

@login_required
def update(request, id):
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 1))
        if not isinstance(request.session.get('cart'), dict):
            request.session['cart'] = {}
        
        if quantity > 0 and quantity <= 10:
            request.session['cart'][str(id)] = quantity
            request.session.modified = True
    
    return redirect('cart.index')

@login_required
def remove(request, id):
    if request.method == 'POST':
        if not isinstance(request.session.get('cart'), dict):
            request.session['cart'] = {}
        
        cart = request.session['cart']
        if str(id) in cart:
            del cart[str(id)]
            request.session.modified = True
    
    return redirect('cart.index') 
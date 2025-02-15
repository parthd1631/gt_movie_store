from django.shortcuts import render, redirect, get_object_or_404
from .models import Movie, Review
from django.contrib.auth.decorators import login_required
from django.db.models import Q
import random

def index(request):
    movies = Movie.objects.all()
    
    # Filter by search term
    search_term = request.GET.get('search')
    if search_term:
        movies = movies.filter(
            Q(name__icontains=search_term) | 
            Q(description__icontains=search_term)
        )
    
    # Filter by price range
    price_range = request.GET.get('price_range')
    if price_range:
        if price_range == 'under_10':
            movies = movies.filter(price__lt=10)
        elif price_range == '10_to_20':
            movies = movies.filter(price__gte=10, price__lte=20)
        elif price_range == 'over_20':
            movies = movies.filter(price__gt=20)
    
    # Sort options
    sort_by = request.GET.get('sort')
    if sort_by:
        if sort_by == 'price_asc':
            movies = movies.order_by('price')
        elif sort_by == 'price_desc':
            movies = movies.order_by('-price')
        elif sort_by == 'name_asc':
            movies = movies.order_by('name')
        elif sort_by == 'name_desc':
            movies = movies.order_by('-name')
    
    # Get a random featured movie
    featured_movie = None
    if movies.exists():
        featured_movie = random.choice(movies)

    template_data = {
        'title': 'Movies',
        'movies': movies,
        'featured_movie': featured_movie,
        'current_filters': {
            'search': search_term,
            'price_range': price_range,
            'sort': sort_by
        }
    }
    return render(request, 'movies/index.html', {'template_data': template_data})

def show(request, id):
    movie = get_object_or_404(Movie, id=id)
    reviews = Review.objects.filter(movie=movie).order_by('-date')
    
    template_data = {
        'title': movie.name,
        'movie': movie,
        'reviews': reviews,
    }
    return render(request, 'movies/show.html', {'template_data': template_data})

@login_required
def create_review(request, id):
    if request.method == 'POST' and request.POST['comment'] != '':
        movie = Movie.objects.get(id=id)
        review = Review()
        review.comment = request.POST['comment']
        review.movie = movie
        review.user = request.user
        review.save()
        return redirect('movies.show', id=id)
    else:
        return redirect('movies.show', id=id)

@login_required
def edit_review(request, id, review_id):
    review = get_object_or_404(Review, id=review_id)
    if request.user != review.user:
        return redirect('movies.show', id=id)

    if request.method == 'GET':
        template_data = {}
        template_data['title'] = 'Edit Review'
        template_data['review'] = review
        return render(request, 'movies/edit_review.html', {'template_data': template_data})
    elif request.method == 'POST' and request.POST['comment'] != '':
        review.comment = request.POST['comment']
        review.save()
        return redirect('movies.show', id=id)
    else:
        return redirect('movies.show', id=id)

@login_required
def delete_review(request, id, review_id):
    review = get_object_or_404(Review, id=review_id, user=request.user)
    review.delete()
    return redirect('movies.show', id=id)
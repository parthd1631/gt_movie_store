from django.shortcuts import render
from movies.models import Movie

# Create your views here.
def index(request):
    template_data = {}
    template_data['title'] = 'GT Movie Store'
    template_data['movies'] = Movie.objects.all()
    return render(request, 'home/index.html', {
        'template_data': template_data})
def about(request):
    template_data = {}
    template_data['title'] = 'About'
    return render(request, 'home/about.html',
                  {'template_data': template_data})

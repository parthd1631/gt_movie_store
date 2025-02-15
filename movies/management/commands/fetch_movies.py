from django.core.management.base import BaseCommand
import json
import requests
from tmdbv3api import TMDb, Movie
import os

class Command(BaseCommand):
    help = 'Fetch movies from TMDB API and create fixture'

    def handle(self, *args, **kwargs):
        # Initialize TMDB
        tmdb = TMDb()
        tmdb.api_key = '967ac4f3b24a49d72ca60ef384a3871f'  # Replace with your API key
        movie = Movie()

        # Get popular movies
        popular = movie.popular()  # Get first 20 movies
        
        fixture_data = []
        for i, m in enumerate(popular, 1):
            if i > 20:  # Only get first 20 movies
                break
                
            # Get poster path
            poster_path = m.poster_path
            image_url = f"https://image.tmdb.org/t/p/original{poster_path}"
            
            # Download image
            image_name = f"movie_images/{m.title.replace(' ', '_')}.jpg"
            response = requests.get(image_url)
            
            # Save image
            os.makedirs('media/movie_images', exist_ok=True)
            with open(f'media/{image_name}', 'wb') as f:
                f.write(response.content)

            # Create fixture entry
            fixture_data.append({
                "model": "movies.movie",
                "pk": i,
                "fields": {
                    "name": m.title,
                    "price": 12.99,
                    "description": m.overview,
                    "image": image_name
                }
            })

        # Save fixture file
        with open('movies/fixtures/initial_movies.json', 'w') as f:
            json.dump(fixture_data, f, indent=4)

        self.stdout.write(self.style.SUCCESS('Successfully created movie fixture')) 
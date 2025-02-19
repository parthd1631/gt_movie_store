# GT Movie Store

GT Movie Store is a web application that allows users to browse, search, and purchase movies online. The platform offers a wide range of movies across various genres, providing an intuitive and seamless user experience.

## Features

- **Browse Movies**: Explore a vast collection of movies with detailed information.
- **Search Functionality**: Find movies by title, genre, or keywords.
- **User Accounts**: Create and manage user profiles.
- **Shopping Cart**: Add movies to your cart and proceed to checkout.
- **Order History**: View your past purchases and order details.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, Django
- **Database**: SQLite

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/parthd1631/gt_movie_store.git
   cd gt_movie_store
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```

3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Start the development server:

   ```bash
   python manage.py runserver
   ```

6. Open your browser and visit `http://127.0.0.1:8000/` to access the application.

## Requirements

To run this project, ensure you have the necessary dependencies installed. They can be found in `requirements.txt`, and you can install them using:

```bash
pip install -r requirements.txt
```

This will install all necessary libraries, including:

- Django
- tmdbv3api
- requests
- django-crontab
- pillow
- and other dependencies

## Live Demo

You can check out the hosted version of the project here: [GT Movie Store](http://3.22.102.253:8000/)

##


from django.shortcuts import render, redirect
from django.contrib import messages

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        # Your login logic here
        
    return render(request, 'authentication/login.html')

def register(request):
    return render(request, 'authentication/register.html')

def forgot_password(request):
    return render(request, 'authentication/forgot_password.html')

def logout(request):
    # Your logout logic here
    return redirect('authentication.login') 
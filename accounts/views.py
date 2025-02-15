from django.shortcuts import render
from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from .forms import CustomUserCreationForm, CustomErrorList
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import UserProfile

@login_required
def logout(request):
    auth_logout(request)
    return redirect('home.index')

def login(request):
    template_data = {}
    template_data['title'] = 'Login'
    if request.method == 'GET':
        return render(request, 'accounts/login.html', {'template_data': template_data})
    elif request.method == 'POST':
        user = authenticate(request, username = request.POST['username'], password = request.POST['password'])
        if user is None:
            template_data['error'] = 'The username or password is incorrect.'
            return render(request, 'accounts/login.html', {'template_data': template_data})
        else:
            auth_login(request, user)
            return redirect('home.index')

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(
                user=user,
                security_question=form.cleaned_data['security_question'],
                security_answer=form.cleaned_data['security_answer']
            )
            auth_login(request, user)
            return redirect('home.index')
    else:
        form = CustomUserCreationForm()
    template_data = {}
    template_data['title'] = 'Sign Up'
    return render(request, 'accounts/signup.html',
        {'template_data': template_data, 'form': form})

@login_required
def orders(request):
    template_data = {}
    template_data['title'] = 'Orders'
    template_data['orders'] = request.user.order_set.all()
    return render(request, 'accounts/orders.html',
        {'template_data': template_data})

def reset_password(request):
    if request.method == 'POST':
        if 'username' in request.POST:
            # First step: Show security question
            username = request.POST.get('username')
            try:
                user = User.objects.get(username=username)
                request.session['reset_user_id'] = user.id
                return render(request, 'accounts/reset_password.html', {
                    'show_question': True,
                    'security_question': user.userprofile.security_question
                })
            except User.DoesNotExist:
                return render(request, 'accounts/reset_password.html', {
                    'error': 'Username not found'
                })
        else:
            # Second step: Verify answer and reset password
            user_id = request.session.get('reset_user_id')
            if not user_id:
                return redirect('accounts.reset_password')
            
            user = User.objects.get(id=user_id)
            security_answer = request.POST.get('security_answer')
            new_password = request.POST.get('new_password')
            
            if user.userprofile.security_answer == security_answer:
                user.set_password(new_password)
                user.save()
                del request.session['reset_user_id']
                return redirect('accounts.login')
            else:
                return render(request, 'accounts/reset_password.html', {
                    'show_question': True,
                    'security_question': user.userprofile.security_question,
                    'error': 'Incorrect answer'
                })
    
    return render(request, 'accounts/reset_password.html', {'show_question': False})
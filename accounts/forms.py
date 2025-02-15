from django.utils.safestring import mark_safe
from django.contrib.auth.forms import UserCreationForm
from django.forms.utils import ErrorList
from .models import UserProfile
from django import forms

class CustomErrorList(ErrorList):
    def __str__(self):
        if not self:
            return ''
        return mark_safe(''.join([ f'<div class="alert alert-danger" role="alert">{e}</div>' for e in self]))

class CustomUserCreationForm(UserCreationForm):
    security_question = forms.CharField(max_length=255, required=True)
    security_answer = forms.CharField(max_length=255, required=True)

    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ('email',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.error_class = CustomErrorList
        for fieldname in ['username', 'password1',
        'password2', 'security_question', 'security_answer']:
            self.fields[fieldname].help_text = None
            self.fields[fieldname].widget.attrs.update(
                {'class': 'form-control'}
            )
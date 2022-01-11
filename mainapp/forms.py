from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()


class LoginForm(forms.ModelForm):
    email = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'type':'text', 'id':'email', 'can-field':'username', 'autocomplete':'off', 'autocorrect':'off', 'autocapitalize':'off', 'aria-required':'true', 'required':'required', 'spellcheck':'false', 'placeholder':'Почта', 'aria-invalid':'false', 'autofocus':''}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'type':'password', 'id':'password', 'can-field':'password', 'autocomplete':'off', 'autocorrect':'off', 'autocapitalize':'off', 'aria-required':'true', 'required':'required', 'spellcheck':'false', 'placeholder':'Пароль', 'aria-invalid':'false', 'autofocus':''}))

    class Meta:
        model = User
        fields = ['email', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].label = ''
        self.fields['password'].label = ''

    def clean(self):
        email = self.cleaned_data['email']
        password = self.cleaned_data['password']
        if not User.objects.filter(email=email).exists():
            raise forms.ValidationError(f'Пользователь "{email}" не найден или неверный пароль')
        user = User.objects.filter(email=email).first()
        if user:
            if not user.check_password(password):
                raise forms.ValidationError(f'Пользователь "{email}" не найден или неверный пароль')
        return self.cleaned_data


class RegistrationForm(forms.ModelForm):

    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'type':'text', 'id':'email', 'can-field':'username', 'autocomplete':'off', 'autocorrect':'off', 'autocapitalize':'off', 'aria-required':'true', 'required':'required', 'spellcheck':'false', 'placeholder':'Почта', 'aria-invalid':'false', 'autofocus':''}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'type':'password', 'id':'password', 'can-field':'password', 'autocomplete':'off', 'autocorrect':'off', 'autocapitalize':'off', 'aria-required':'true', 'required':'required', 'spellcheck':'false', 'placeholder':'Пароль', 'aria-invalid':'false', 'autofocus':''}))
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'type':'password', 'id':'password', 'can-field':'confirm_password', 'autocomplete':'off', 'autocorrect':'off', 'autocapitalize':'off', 'aria-required':'true', 'required':'required', 'spellcheck':'false', 'placeholder':'Подтвердите пароль', 'aria-invalid':'false', 'autofocus':''}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = ''
        self.fields['password'].label = ''
        self.fields['confirm_password'].label = ''

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError(
                f'Данный почтовый адрес уже зарегистрирован'
            )
        if User.objects.filter(email=username).exists():
            raise forms.ValidationError(
                f'Данный почтовый адрес уже зарегистрирован'
            )
        return username

    def clean(self):
        password = self.cleaned_data['password']
        confirm_password = self.cleaned_data['confirm_password']
        if password != confirm_password:
            raise forms.ValidationError('Пароли не совпадают')
        return self.cleaned_data

    class Meta:
        model = User
        fields = ['username', 'password', 'confirm_password']



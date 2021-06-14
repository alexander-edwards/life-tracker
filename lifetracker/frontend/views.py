from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')


def history(request):
    return render(request, 'frontend/history.html')


def user(request):
    return render(request, 'frontend/user.html')

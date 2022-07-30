# Django
from django.shortcuts import render

# Create your views here.
def front(request):
    context = { }
    return render(request, "index.html", context)
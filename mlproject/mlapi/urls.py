from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_traffic, name='predict_traffic'),
]

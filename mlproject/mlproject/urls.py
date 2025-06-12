from django.http import HttpResponse



from django.contrib import admin
from django.urls import path, include
from mlapi import views

urlpatterns = [
      path('', lambda r: HttpResponse("RouteWiz ML API"), name='root'),
    path('admin/', admin.site.urls),
    path('api/', include('mlapi.urls')),
     path('predict/', views.predict_traffic, name='predict_traffic'),
]


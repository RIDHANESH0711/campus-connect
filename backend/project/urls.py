from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/students/', include('users.student_urls')),
    path('api/categories/', include('categories.urls')),
    path('api/venues/', include('venues.urls')),
    path('api/events/', include('events.urls')),
    path('api/registrations/', include('registrations.urls')),
    path('api/feedback/', include('feedback.urls')),
]

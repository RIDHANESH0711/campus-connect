from rest_framework import viewsets, filters
from .models import Venue
from .serializers import VenueSerializer
from users.permissions import IsAdminOrReadOnly

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all().order_by('name')
    serializer_class = VenueSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from users.permissions import IsAdminOrReadOnly

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['event_name', 'description', 'organizer']
    ordering_fields = ['date', 'created_at', 'event_name']

    def get_queryset(self):
        queryset = Event.objects.all().order_by('-date')
        
        # Public users/students only see non-draft unless admin
        user = self.request.user
        if not (user and user.is_authenticated and (user.role == 'ADMIN' or user.is_staff)):
            queryset = queryset.filter(status__in=['Published', 'Ongoing', 'Completed'])

        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category_id=category)

        event_status = self.request.query_params.get('status')
        if event_status:
            queryset = queryset.filter(status=event_status)

        venue = self.request.query_params.get('venue')
        if venue:
            queryset = queryset.filter(venue_id=venue)

        date_val = self.request.query_params.get('date')
        if date_val:
            queryset = queryset.filter(date=date_val)

        return queryset

    @action(detail=False, methods=['GET'])
    def featured(self, request):
        events = self.get_queryset().filter(status='Published')[:4]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

from rest_framework import viewsets, permissions, filters
from .models import Feedback
from .serializers import FeedbackSerializer
from users.permissions import IsAdminUserRole

class FeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['user__name', 'event__event_name', 'comment']
    ordering_fields = ['created_at', 'rating']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN' or user.is_staff:
            queryset = Feedback.objects.all().order_by('-created_at')
        else:
            queryset = Feedback.objects.filter(user=user).order_by('-created_at')

        event_id = self.request.query_params.get('event')
        if event_id:
            queryset = queryset.filter(event_id=event_id)

        rating_val = self.request.query_params.get('rating')
        if rating_val:
            queryset = queryset.filter(rating=rating_val)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

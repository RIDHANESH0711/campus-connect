from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Registration
from .serializers import RegistrationSerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['user__name', 'user__register_number', 'user__email', 'event__event_name']
    ordering_fields = ['registration_date', 'status']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN' or user.is_staff:
            queryset = Registration.objects.all().order_by('-registration_date')
        else:
            queryset = Registration.objects.filter(user=user).order_by('-registration_date')

        event_id = self.request.query_params.get('event')
        if event_id:
            queryset = queryset.filter(event_id=event_id)

        reg_status = self.request.query_params.get('status')
        if reg_status:
            queryset = queryset.filter(status=reg_status)

        department = self.request.query_params.get('department')
        if department:
            queryset = queryset.filter(user__department__iexact=department)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status='Registered')

    @action(detail=True, methods=['PATCH'])
    def cancel(self, request, pk=None):
        registration = self.get_object()
        if request.user.role != 'ADMIN' and not request.user.is_staff and registration.user != request.user:
            return Response({"detail": "Not authorized to cancel this registration."}, status=status.HTTP_403_FORBIDDEN)
        
        registration.status = 'Cancelled'
        registration.save()
        return Response({"message": "Registration cancelled successfully.", "status": registration.status})

    @action(detail=True, methods=['PATCH'])
    def approve(self, request, pk=None):
        if request.user.role != 'ADMIN' and not request.user.is_staff:
            return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        registration = self.get_object()
        registration.status = 'Approved'
        registration.save()
        return Response({"message": "Registration approved.", "status": registration.status})

    @action(detail=True, methods=['PATCH'])
    def reject(self, request, pk=None):
        if request.user.role != 'ADMIN' and not request.user.is_staff:
            return Response({"detail": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        registration = self.get_object()
        registration.status = 'Rejected'
        registration.save()
        return Response({"message": "Registration rejected.", "status": registration.status})

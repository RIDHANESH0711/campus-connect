from rest_framework import serializers
from .models import Registration
from users.serializers import UserSerializer
from events.serializers import EventSerializer
from events.models import Event
from django.utils import timezone

class RegistrationSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    event_detail = EventSerializer(source='event', read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), source='event', write_only=True)

    class Meta:
        model = Registration
        fields = [
            'id', 'user', 'user_detail', 'event_id', 'event_detail',
            'registration_date', 'status'
        ]
        read_only_fields = ['id', 'user', 'registration_date']

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user if request else None
        event = attrs.get('event')

        if not user or not user.is_authenticated:
            raise serializers.ValidationError("Authentication required to register.")

        if self.instance is None:  # Creating registration
            # Check unique registration
            if Registration.objects.filter(user=user, event=event).exclude(status='Cancelled').exists():
                raise serializers.ValidationError("You are already registered for this event.")

            # Check event status
            if event.status not in ['Published', 'Ongoing']:
                raise serializers.ValidationError(f"Cannot register for an event with status '{event.status}'.")

            # Check registration deadline
            if timezone.now() > event.registration_deadline:
                raise serializers.ValidationError("Registration deadline for this event has passed.")

            # Check seats
            if event.available_seats <= 0:
                raise serializers.ValidationError("Event is full. No available seats remaining.")

        return attrs

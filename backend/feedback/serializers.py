from rest_framework import serializers
from .models import Feedback
from users.serializers import UserSerializer
from events.serializers import EventSerializer
from events.models import Event
from registrations.models import Registration

class FeedbackSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    event_detail = EventSerializer(source='event', read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), source='event', write_only=True)

    class Meta:
        model = Feedback
        fields = [
            'id', 'user', 'user_detail', 'event_id', 'event_detail',
            'rating', 'comment', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user if request else None
        event = attrs.get('event')

        if not user or not user.is_authenticated:
            raise serializers.ValidationError("Authentication required to submit feedback.")

        if self.instance is None:
            # Prevent duplicate feedback
            if Feedback.objects.filter(user=user, event=event).exists():
                raise serializers.ValidationError("You have already submitted feedback for this event.")

            # Ensure student is registered for event
            if not Registration.objects.filter(user=user, event=event, status__in=['Registered', 'Approved', 'Completed']).exists():
                raise serializers.ValidationError("You can only submit feedback for events you have registered for.")

        rating = attrs.get('rating')
        if rating is not None and (rating < 1 or rating > 5):
            raise serializers.ValidationError({"rating": "Rating must be between 1 and 5."})

        return attrs

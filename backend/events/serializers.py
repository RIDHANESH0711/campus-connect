from rest_framework import serializers
from .models import Event
from categories.serializers import CategorySerializer
from venues.serializers import VenueSerializer
from categories.models import Category
from venues.models import Venue
from django.utils import timezone

class EventSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    venue_detail = VenueSerializer(source='venue', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    venue_id = serializers.PrimaryKeyRelatedField(queryset=Venue.objects.all(), source='venue', write_only=True)
    registered_count = serializers.IntegerField(read_only=True)
    available_seats = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'event_name', 'description', 'category_id', 'category_detail',
            'date', 'start_time', 'end_time', 'venue_id', 'venue_detail',
            'organizer', 'max_participants', 'registration_deadline', 'poster',
            'status', 'registered_count', 'available_seats', 'created_at', 'updated_at'
        ]

    def validate(self, attrs):
        start_time = attrs.get('start_time')
        end_time = attrs.get('end_time')
        if start_time and end_time and end_time <= start_time:
            raise serializers.ValidationError({"end_time": "End time must be after start time."})

        event_date = attrs.get('date')
        reg_deadline = attrs.get('registration_deadline')
        if event_date and reg_deadline:
            if reg_deadline.date() > event_date:
                raise serializers.ValidationError({"registration_deadline": "Registration deadline cannot be after the event date."})

        max_parts = attrs.get('max_participants')
        if max_parts is not None and max_parts <= 0:
            raise serializers.ValidationError({"max_participants": "Maximum participants must be greater than 0."})

        venue = attrs.get('venue')
        if venue and not venue.availability:
            raise serializers.ValidationError({"venue_id": "Selected venue is currently unavailable."})

        return attrs

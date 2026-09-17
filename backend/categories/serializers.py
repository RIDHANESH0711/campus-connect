from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    events_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'events_count']

    def get_events_count(self, obj):
        return getattr(obj, 'event_set', []).count() if hasattr(obj, 'event_set') else 0

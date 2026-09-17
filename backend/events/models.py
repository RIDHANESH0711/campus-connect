from django.db import models
from categories.models import Category
from venues.models import Venue

class Event(models.Model):
    STATUS_CHOICES = (
        ('Draft', 'Draft'),
        ('Published', 'Published'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    event_name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, related_name='events')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    venue = models.ForeignKey(Venue, on_delete=models.RESTRICT, related_name='events')
    organizer = models.CharField(max_length=150)
    max_participants = models.PositiveIntegerField()
    registration_deadline = models.DateTimeField()
    poster = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.event_name} - {self.date}"

    @property
    def registered_count(self):
        return self.registrations.filter(status__in=['Registered', 'Approved', 'Completed']).count()

    @property
    def available_seats(self):
        seats = self.max_participants - self.registered_count
        return max(0, seats)

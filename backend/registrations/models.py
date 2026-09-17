from django.db import models
from django.conf import settings
from events.models import Event

class Registration(models.Model):
    STATUS_CHOICES = (
        ('Registered', 'Registered'),
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Cancelled', 'Cancelled'),
        ('Completed', 'Completed'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='registrations')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    registration_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Registered')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'event'], name='unique_user_event_registration')
        ]
        ordering = ['-registration_date']

    def __str__(self):
        return f"Registration #{self.id} - {self.user.name} for {self.event.event_name} [{self.status}]"

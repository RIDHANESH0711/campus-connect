from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=150, unique=True)
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.location}) - Capacity: {self.capacity}"

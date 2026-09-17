import os
import sys
import django
from datetime import date, time, datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from django.contrib.auth import get_user_model
from categories.models import Category
from venues.models import Venue
from events.models import Event
from registrations.models import Registration
from feedback.models import Feedback

User = get_user_model()

def seed():
    print("🌱 Seeding CampusConnect Database...")

    # 1. Create Users
    admin, _ = User.objects.get_or_create(
        email="admin@campusconnect.edu",
        defaults={
            "name": "Dr. Sarah Jenkins",
            "role": "ADMIN",
            "is_staff": True,
            "is_superuser": True,
            "phone": "+1 (555) 019-2831",
            "department": "Dean of Student Affairs",
            "year": "Faculty"
        }
    )
    admin.set_password("Admin@123")
    admin.save()

    student1, _ = User.objects.get_or_create(
        email="alex.rivera@campusconnect.edu",
        defaults={
            "name": "Alex Rivera",
            "role": "STUDENT",
            "register_number": "CS2026-0892",
            "phone": "+1 (555) 342-9012",
            "department": "Computer Science & Engineering",
            "year": "3rd Year"
        }
    )
    student1.set_password("Student@123")
    student1.save()

    student2, _ = User.objects.get_or_create(
        email="emily.chen@campusconnect.edu",
        defaults={
            "name": "Emily Chen",
            "role": "STUDENT",
            "register_number": "EC2026-0412",
            "phone": "+1 (555) 489-1029",
            "department": "Electronics & Communication",
            "year": "2nd Year"
        }
    )
    student2.set_password("Student@123")
    student2.save()

    # 2. Categories
    categories = [
        ("Technical", "Coding contests, tech symposiums, and engineering expos"),
        ("Workshop", "Hands-on learning sessions led by domain experts"),
        ("Cultural", "Music festivals, dance competitions, and theatrical performances"),
        ("Sports", "Inter-departmental and intra-college athletic tournaments"),
        ("Symposium", "Research paper presentations and academic discussions"),
        ("Hackathon", "Intensive multi-hour product building sprints"),
        ("Seminar", "Guest lectures and industry expert keynotes"),
        ("Club Activity", "Regular campus club meetups and interactive sessions"),
    ]
    cat_objs = {}
    for name, desc in categories:
        cat_objs[name], _ = Category.objects.get_or_create(name=name, defaults={"description": desc})

    # 3. Venues
    venues = [
        ("Main Auditorium", "Block A, Central Campus", 800, True),
        ("Turing Computer Lab", "Block C, 3rd Floor", 120, True),
        ("Mini Seminar Hall 1", "Library Building, 2nd Floor", 250, True),
        ("Campus Sports Complex", "West Grounds", 1500, True),
        ("Innovation Hub", "Block D, Ground Floor", 80, True),
        ("Open Air Theatre", "North Lawn", 1200, True)
    ]
    venue_objs = {}
    for vname, vloc, vcap, vavail in venues:
        venue_objs[vname], _ = Venue.objects.get_or_create(
            name=vname,
            defaults={"location": vloc, "capacity": vcap, "availability": vavail}
        )

    # 4. Events
    today = date.today()
    events_data = [
        {
            "name": "AI & Deep Learning Hackathon 2026",
            "desc": "A 24-hour intensive product build sprint focusing on generative AI and healthcare applications. Free snacks and mentoring provided!",
            "cat": cat_objs["Hackathon"],
            "date": today + timedelta(days=5),
            "start": time(9, 0),
            "end": time(18, 0),
            "venue": venue_objs["Turing Computer Lab"],
            "org": "ACM Student Chapter",
            "max": 100,
            "deadline": datetime.combine(today + timedelta(days=4), time(23, 59)),
            "poster": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
            "status": "Published"
        },
        {
            "name": "Annual Inter-College Cultural Fest 'Resonance'",
            "desc": "Join us for 3 days of music, dance, battle of the bands, drama, and food stalls featuring performance by national bands.",
            "cat": cat_objs["Cultural"],
            "date": today + timedelta(days=12),
            "start": time(10, 0),
            "end": time(21, 0),
            "venue": venue_objs["Open Air Theatre"],
            "org": "Campus Cultural Council",
            "max": 1000,
            "deadline": datetime.combine(today + timedelta(days=10), time(23, 59)),
            "poster": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
            "status": "Published"
        },
        {
            "name": "Cybersecurity & Ethical Hacking Masterclass",
            "desc": "Learn defensive cybersecurity, vulnerability research, network penetration testing basics, and CTF strategy from security experts.",
            "cat": cat_objs["Workshop"],
            "date": today + timedelta(days=3),
            "start": time(14, 0),
            "end": time(17, 0),
            "venue": venue_objs["Mini Seminar Hall 1"],
            "org": "CyberSec Club",
            "max": 200,
            "deadline": datetime.combine(today + timedelta(days=2), time(23, 59)),
            "poster": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
            "status": "Published"
        },
        {
            "name": "Inter-Department Athletics Tournament",
            "desc": "Track events, 100m sprint, relay, long jump, and football championship match between department teams.",
            "cat": cat_objs["Sports"],
            "date": today + timedelta(days=8),
            "start": time(8, 0),
            "end": time(16, 0),
            "venue": venue_objs["Campus Sports Complex"],
            "org": "Department of Physical Education",
            "max": 500,
            "deadline": datetime.combine(today + timedelta(days=7), time(23, 59)),
            "poster": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
            "status": "Published"
        },
    ]

    event_objs = []
    for ed in events_data:
        ev, _ = Event.objects.get_or_create(
            event_name=ed["name"],
            defaults={
                "description": ed["desc"],
                "category": ed["cat"],
                "date": ed["date"],
                "start_time": ed["start"],
                "end_time": ed["end"],
                "venue": ed["venue"],
                "organizer": ed["org"],
                "max_participants": ed["max"],
                "registration_deadline": ed["deadline"],
                "poster": ed["poster"],
                "status": ed["status"]
            }
        )
        event_objs.append(ev)

    # 5. Registrations
    reg1, _ = Registration.objects.get_or_create(user=student1, event=event_objs[0], defaults={"status": "Approved"})
    reg2, _ = Registration.objects.get_or_create(user=student1, event=event_objs[1], defaults={"status": "Registered"})
    reg3, _ = Registration.objects.get_or_create(user=student2, event=event_objs[0], defaults={"status": "Registered"})

    # 6. Feedback
    Feedback.objects.get_or_create(
        user=student1,
        event=event_objs[0],
        defaults={"rating": 5, "comment": "Outstanding hackathon setup and mentors! Learned a lot about LLM fine-tuning."}
    )

    print("✅ CampusConnect Database Seeding Complete!")

if __name__ == '__main__':
    seed()

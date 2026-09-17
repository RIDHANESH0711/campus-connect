from rest_framework.routers import DefaultRouter
from .views import RegistrationViewSet

router = DefaultRouter()
router.register(r'', RegistrationViewSet, basename='registrations')

urlpatterns = router.urls

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import SectionForm

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def link_section_form_to_user(sender, instance, created, **kwargs):
    if created:
        SectionForm.objects.filter(
            email = instance.email,
            user__isnull = True
        ).update(user=instance)
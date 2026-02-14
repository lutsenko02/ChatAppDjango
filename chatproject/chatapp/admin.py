from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Faculty)
admin.site.register(SectionForm)
admin.site.register(Conversation)
admin.site.register(Message)
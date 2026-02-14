from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Prefetch

class User(AbstractUser):

    email = models.EmailField(unique=True)
    is_tutor = models.BooleanField(
        default=False
    )

    class Meta:
        verbose_name = u"Пользователь"
        verbose_name_plural = u"Пользователи"
    
    def __str__(self):
        return self.username
    
class Faculty(models.Model):
    
    name = models.CharField(
        max_length=255,
        unique=True
    )

    class Meta:
        verbose_name = u"Факультет"
        verbose_name_plural = u"Факультеты"

    def __str__(self):
        return f"{self.name}"

class SectionForm(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sections"
    )

    section = models.CharField(max_length=100)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True)
    birthday = models.DateField() 
    group = models.CharField(max_length=50)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    phone = models.CharField(max_length=11)
    why_interesting = models.TextField(max_length=600)
    experience = models.TextField(max_length=600)
    created_at = models.DateTimeField(
        auto_created=True
    )

    class Meta:
        verbose_name = u"Форма направления"
        verbose_name_plural = u"Формы направлений"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["email", "section"],
                name="unique_email_section"
            )
        ]
    
    def __str__(self):
        return f"{self.full_name} -> {self.section}"

class ConversationManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().prefetch_related(
            Prefetch('participants', queryset=User.objects.only('id', 'username'))
        )
    
class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    objects = ConversationManager()

    class Meta:
        verbose_name = u"Беседа"
        verbose_name_plural = u"Беседы"

    def __str__(self):
        participant_names = " ,".join([user.username for user in self.participants.all()])
        return f'Беседа {participant_names}'
    
class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = u"Сообщение"
        verbose_name_plural = u"Сообщения"

    def __str__(self):
        return f'Сообщение из {self.sender.username} в {self.content[:20]}'

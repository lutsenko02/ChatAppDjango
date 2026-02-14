from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = serializer.save()

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]

class UserSectionView(generics.ListAPIView):
    serializer_class = UserSectionFormSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.sections.all())
        return self.request.user.sections.all()
    
class SelectFaculty(generics.ListAPIView):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [AllowAny]

class CreateSectionForm(generics.CreateAPIView):
    queryset = SectionForm.objects.all()
    serializer_class = SectionFormSerializer
    permission_classes = [AllowAny]

class ConversationListCreateView(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (Conversation.objects
            .filter(participants=self.request.user)
            .prefetch_related('participants'))
    
    def create(self, request, *args, **kwargs):
        participants_data = request.data.get('participants', [])

        if len(participants_data) != 2:
            return Response(
                {'error': 'Для чата нужно 2 участника!'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if str(request.user.id) not in map(str, participants_data):
            return Response(
                {'error': 'Вы не являетесь участником чата!'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        users = User.objects.filter(id__in=participants_data)
        if users.count() != 2:
            return Response(
                {'error': 'Для чата нужно 2 участника!'},
                status=status.HTTP_400_BAD_REQUEST                
            )
        
        existing_conversation = Conversation.objects.filter(
            participants__id=participants_data[0]
        ).filter(
            participants__id=participants_data[1]
        ).distinct()

        if existing_conversation.exists():
            return Response(
                {'error': 'Между этими участниками уже существует беседа!'},
                status=status.HTTP_400_BAD_REQUEST                  
            )
        
        conversation = Conversation.objects.create()
        conversation.participants.set(users)

        #сериализовать разговор
        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class MessageListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        conversation = self.get_conversation(conversation_id)

        return conversation.messages.order_by('timestamp')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateMessageSerializer
        return MessageSerializer
    
    def perform_create(self, serializer):
        #получить беседу и проверить участие пользователя
        print("Входящий разговор", self.request.data)
        conversation_id = self.kwargs['conversation_id']
        conversation = self.get_conversation(conversation_id)

        serializer.save(sender=self.request.user, conversation=conversation)
    
    def get_conversation(self, conversation_id):
        #Проверка на наличие учатсника в чате
        conversation = get_object_or_404(Conversation, id=conversation_id)
        if self.request.user not in conversation.participants.all():
            raise PermissionDenied('Вы не являетесь участником этого разговора')
        return conversation
    
class MessageRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        return Message.objects.filter(conversation__id=conversation_id)
    
    def perform_destroy(self, instance):
        if instance.sender != self.request.user:
            raise PermissionDenied('Вы не являетесь отправителем этого сообщения')
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
    
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ('id', 'name')
    
class SectionFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionForm
        fields = ["id", "section", "full_name", "email", "birthday", "group", "faculty", "phone", "why_interesting", "experience"]
    
    def create(self, validated_data):
        request = self.context["request"]
        
        if request.user.is_authenticated:
            validated_data["user"] = request.user
            validated_data["email"] = request.user.email
            validated_data["full_name"] = request.user.get_full_name()

        return super().create(validated_data)

class UserSectionFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionForm
        fields = ['id', 'section']

class ConversationSerializer(serializers.ModelSerializer):
    participants = UserListSerializer(many=True, read_only=True)
    class Meta:
        model = Conversation
        fields = ('id', 'participants', 'created_at')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
        
class MessageSerializer(serializers.ModelSerializer):
    sender = UserListSerializer()
    participants = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = ('id', 'conversation', 'sender', 'content', 'timestamp', 'participants')

    def get_participants(self, obj):
        return UserListSerializer(obj.conversation.participants.all(), many=True).data
        
class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('conversation', 'content')

            
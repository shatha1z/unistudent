from rest_framework import serializers
from .models import Student,Program


class StudentSerializer(serializers.ModelSerializer):
  
    class Meta:
          model = Student
          fields = '__all__'

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("The passwords do not match.")
        return data

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Student, Program
from .serializers import StudentSerializer, ProgramSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt




class RegistrationView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
        
class GraduateProgramsView(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer



@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        # get the email and password from the request body
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # check if student exists with the given email and password
        try:
            student = Student.objects.get(email=email, password=password)
        except Student.DoesNotExist:
            return JsonResponse({'success': False})
        
        # get program details for the student
        program = Program.objects.get(student_id=student.id)
        
        # set user data in localStorage
        user_data = {
            'email': email,
            'full_name': f"{student.first_name} {student.last_name}",
            'photo': student.photo.url,
            'level_of_study': program.level_of_study,
            'program_name': program.program_name,
            'faculty_division': program.faculty_division,
            'student_data': StudentSerializer(student).data,
            'program_data': ProgramSerializer(program).data,
        }
        request.session['user'] = user_data
        
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
    



@login_required
@require_http_methods(["GET"])
def user_info(request):
    user = request.user
    student = Student.objects.get(user=user)
    program = Program.objects.get(id=student.student_id)

    data = {
        "full_name": user.get_full_name(),
        "photo": user.profile.photo.url,
        "level_of_study": program.level_of_study,
        "program_name": program.program_name,
        "faculty_division": program.faculty_division,
        "student_data": StudentSerializer.serialize('python', [user]),
        "program_data": ProgramSerializer.serialize('python', [program]),
    }

    return JsonResponse(data, safe=False)




    
 
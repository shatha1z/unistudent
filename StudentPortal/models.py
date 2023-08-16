from django.db import models
from django.core.validators import validate_email
from django.forms import ValidationError

class Student(models.Model):
    email = models.EmailField(validators=[validate_email])
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthdate = models.DateField()
    photo = models.ImageField(upload_to='photos/')
    password = models.CharField(max_length=100)
    confirm_password = models.CharField(max_length=100)

    def clean(self):
        if self.password != self.confirm_password:
            raise ValidationError("The passwords do not match.")
    


class Program(models.Model):
    LEVELS_OF_STUDY = (
        ('MSc', 'Master of Science'),
        ('PhD', 'Doctor of Philosophy')
    )
    level_of_study = models.CharField(max_length=3, choices=LEVELS_OF_STUDY)
    program_name = models.CharField(max_length=100)
    faculty_division = models.CharField(max_length=100)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)


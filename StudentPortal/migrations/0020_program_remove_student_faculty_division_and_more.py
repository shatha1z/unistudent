# Generated by Django 4.2.4 on 2023-08-12 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StudentPortal', '0019_student_faculty_division_student_level_of_study_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level_of_study', models.CharField(choices=[('MSc', 'Master of Science'), ('PhD', 'Doctor of Philosophy')], max_length=3)),
                ('program_name', models.CharField(max_length=100)),
                ('faculty_division', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='student',
            name='faculty_division',
        ),
        migrations.RemoveField(
            model_name='student',
            name='level_of_study',
        ),
        migrations.RemoveField(
            model_name='student',
            name='program_name',
        ),
    ]

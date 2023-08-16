from django.urls import path
from .views import RegistrationView
from .views import GraduateProgramsView
from .views import login_view
from .views import user_info


urlpatterns = [
    path('registrations/', RegistrationView.as_view(), name='registration'),
    path('graduate-programs/', GraduateProgramsView.as_view(), name='graduate_programs'),
    path('loginPage/', login_view, name='loginPage'),
    path('userInfo/', user_info, name='student_dashboard'),

]

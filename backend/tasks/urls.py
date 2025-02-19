from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.task_list, name='task_list'),  
    path('tasks/create/', views.task_create, name='task_create'),  
    path('tasks/update/<int:task_id>/', views.task_update, name='task_update'), 
    path('tasks/delete/<int:task_id>/', views.task_delete, name='task_delete'), 
]

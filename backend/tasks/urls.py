from django.urls import path, include
from . import views

from rest_framework import routers

router = routers.DefaultRouter()

router.register('task', views.TasksViewSet)




urlpatterns = [
    # path('tasks/', views.task_list, name='task_list'),  
    # path('tasks/create/', views.task_create, name='task_create'),  
    # path('tasks/update/<int:task_id>/', views.task_update, name='task_update'), 
    # path('tasks/delete/<int:task_id>/', views.task_delete, name='task_delete'), 
    path('', include(router.urls)),
]

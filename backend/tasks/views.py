from django.shortcuts import render, get_object_or_404, redirect
from .models import Tasks
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer 

class TasksViewSet(viewsets.ModelViewSet):
    
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [

    ]
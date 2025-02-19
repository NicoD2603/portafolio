from django.shortcuts import render, get_object_or_404, redirect
from .models import Tasks

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

@api_view(['GET'])
def task_list(request):
    tasks = Tasks.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


def task_create(request):
    if request.method == "POST":
        title = request.POST.get('title') 
        description = request.POST.get('description')  
        status = request.POST.get('status', 'pending')   
        Tasks.objects.create(title=title, description=description, status=status)  
        return redirect('task_list')   
    return render(request, 'tasks/task_form.html') 

def task_update(request, task_id):
    task = get_object_or_404(Tasks, id=task_id)  
    if request.method == "POST":
        Tasks.title = request.POST.get('title')  
        Tasks.description = request.POST.get('description')   
        Tasks.status = request.POST.get('status') 
        task.save()
        return redirect('task_list') 
    return render(request, 'tasks/task_form.html', {'task': task})  

def task_delete(request, task_id):
    task = get_object_or_404(Tasks, id=task_id) 
    if request.method == "POST":
        task.delete()  
        return redirect('task_list')   
    return render(request, 'tasks/task_confirm_delete.html', {'task': task}) 

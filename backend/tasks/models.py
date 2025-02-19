from django.db import models

class Tasks(models.Model):
    status_choice = [
        ('pending', 'Pendiente'),
        ('in_progress', 'En Proceso'),
        ('completed', 'Completada'),       
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20, 
        choices=status_choice, 
        default='pending'
    )
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Generated by Django 5.1.6 on 2025-02-18 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('pending', 'Pendiente'), ('in_progress', 'En Proceso'), ('completed', 'Completada')], default='pending', max_length=20)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

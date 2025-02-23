import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error al obtener las tareas:', err)
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.tasks = this.tasks.filter(task => task.id !== id),
      error: (err) => console.error('Error al eliminar la tarea:', err)
    });
  }
}
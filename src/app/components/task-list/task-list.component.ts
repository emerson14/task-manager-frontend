// task-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  imports: [CommonModule, MatTableModule, MatButtonModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'actions'];

  
  @Output() taskSelected = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error al obtener las tareas:', err),
    });
  }
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Error al obtener las tareas:', err),
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => (this.tasks = this.tasks.filter((task) => task.id !== id)),
      error: (err) => console.error('Error al eliminar la tarea:', err),
    });
  }

  editTask(task: Task): void {
    this.taskSelected.emit(task);
  }
}

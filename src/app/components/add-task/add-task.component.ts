import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: Task = { title: '', description: '' };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.addTask(this.task).subscribe({
      next: (newTask) => {
        console.log('Tarea agregada:', newTask);
        this.task = { title: '', description: '' }; // Limpiar el form
      },
      error: (err) => console.error('Error al agregar la tarea:', err)
    });
  }
}
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    FormsModule
  ]
})
export class AddTaskComponent {
  
  task: Task = { title: '', description: '' };
  editing = false;

  @Output() taskUpdated = new EventEmitter<void>(); 

  constructor(private taskService: TaskService) {}

//  metodo para guardar las tareas.

  saveTask(): void {
    if (this.editing) {
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.resetForm();
          this.taskUpdated.emit(); 
        },
        error: (err) => console.error('Error al actualizar la tarea:', err),
      });
    } else {
      this.taskService.addTask(this.task).subscribe({
        next: () => {
          this.resetForm();
          this.taskUpdated.emit(); 
        },
        error: (err) => console.error('Error al agregar la tarea:', err),
      });
    }
  }

  resetForm(): void {
    this.task = { title: '', description: '' };
    this.editing = false;
  }

  setTaskToEdit(task: Task): void {
    this.task = { ...task };
    this.editing = true;
  }
  
  cancelEdit(): void {
    this.resetForm();
  }
}

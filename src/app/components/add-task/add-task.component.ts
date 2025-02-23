import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: Task = { title: '', description: '' };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.addTask(this.task).subscribe(newTask => {
      console.log('Tarea agregada:', newTask);
      // Lógica para actualizar la lista de tareas
      this.task = { title: '', description: '' }; // Limpiar el formulario
    });
  }
}
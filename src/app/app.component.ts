  import { Component } from '@angular/core';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
  

  @Component({
    selector: 'app-root',
    standalone: true, // Esto indica que es un componente independiente
    imports: [ AddTaskComponent, TaskListComponent], // No necesitas HttpClientModule aquí
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'task-manager-frontend';
  }
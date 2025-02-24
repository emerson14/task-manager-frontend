// pruebas unitarias conn Jasmine/Karma

// run test:   ng test


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task, TaskService } from '../../services/task.service';


describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería obtener las tareas', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Tarea 1', description: 'Descripción 1' },
      { id: 2, title: 'Tarea 2', description: 'Descripción 2' },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });
//API
    const req = httpMock.expectOne('http://localhost:8000/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('debería agregar una tarea', () => {
    const newTask: Task = { title: 'Nueva Tarea', description: 'Nueva Descripción' };

    service.addTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });
});
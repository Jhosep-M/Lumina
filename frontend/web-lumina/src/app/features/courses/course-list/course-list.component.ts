import { Component } from '@angular/core';

@Component({
  selector: 'app-course-list',
  standalone: true,
  template: `
    <div class="course-list">
      <h2>Catálogo de cursos</h2>
      <p>Aquí se mostrarán todos los cursos disponibles.</p>
    </div>
  `
})
export class CourseListComponent {}
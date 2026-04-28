// features/paths/services/path.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LearningPath } from '../models/learning-path.model';

// ─── Mock Data ───────────────────────────────────────────────────────────────
// courseIds are ordered from easiest (beginner) to hardest (advanced)
// matching the IDs in CourseService MOCK_COURSES
const MOCK_PATHS: LearningPath[] = [
  {
    id: 'path-frontend',
    title: 'Desarrollador Frontend Completo',
    shortDescription: 'De HTML básico a frameworks modernos con React y Angular.',
    longDescription:
      'Construye interfaces profesionales dominando HTML, CSS, JavaScript, TypeScript, React y Angular. Aprenderás a crear UIs responsivas, manejar el estado, consumir APIs y desplegar aplicaciones en producción. Ruta ideal para quienes quieren entrar al mundo del desarrollo web moderno.',
    icon: '🖥️',
    courseCount: 4,
    courseIds: ['2', '4', '5', '1'],   // React(beginner) → Python(beginner) → UX(inter) → Angular(advanced)
    duration: '35h',
    level: 'all',
    tags: ['HTML', 'CSS', 'React', 'Angular', 'TypeScript'],
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'path-backend',
    title: 'Backend Engineer con Node.js',
    shortDescription: 'APIs, microservicios y bases de datos con Node y TypeScript.',
    longDescription:
      'Aprende a diseñar y construir backends robustos desde cero. Comenzarás con los fundamentos de JavaScript y TypeScript, luego construirás APIs RESTful con Node.js, implementarás arquitecturas de microservicios y dominarás el despliegue con Docker y CI/CD.',
    icon: '⚙️',
    courseCount: 4,
    courseIds: ['4', '7', '6', '3'],   // Python(beg) → TypeScript(inter) → DevOps(inter) → Node(advanced)
    duration: '54h',
    level: 'all',
    tags: ['Node.js', 'TypeScript', 'REST', 'Docker'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'path-data',
    title: 'Data Science & Machine Learning',
    shortDescription: 'Transforma datos en decisiones con Python e IA.',
    longDescription:
      'Inicia tu carrera en ciencia de datos aprendiendo Python, análisis estadístico y visualización de datos antes de sumergirte en algoritmos de Machine Learning y redes neuronales. Incluye proyectos reales con datasets de la industria.',
    icon: '🧠',
    courseCount: 3,
    courseIds: ['4', '7', '8'],         // Python(beg) → TypeScript(inter) → ML(advanced)
    duration: '44h',
    level: 'all',
    tags: ['Python', 'Machine Learning', 'AI', 'Data'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'path-devops',
    title: 'DevOps & Cloud Engineering',
    shortDescription: 'Automatiza, integra y despliega a escala con CI/CD y Kubernetes.',
    longDescription:
      'Domina las prácticas modernas de DevOps: control de versiones avanzado, pipelines de CI/CD con GitHub Actions, contenedores con Docker, orquestación con Kubernetes y monitoreo de producción. La ruta perfecta para equipos que quieren velocidad y confiabilidad.',
    icon: '🚀',
    courseCount: 3,
    courseIds: ['4', '6', '3'],         // Python(beg) → DevOps(inter) → Node Microservices(adv)
    duration: '45h',
    level: 'intermediate',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'path-ux',
    title: 'UX/UI Design Profesional',
    shortDescription: 'Crea experiencias digitales memorables con Figma y principios UX.',
    longDescription:
      'Aprende a diseñar productos digitales que los usuarios aman. Esta ruta te lleva desde los principios fundamentales de UX/UI hasta la creación de sistemas de diseño complejos, prototipado de alta fidelidad y la colaboración efectiva con equipos de desarrollo.',
    icon: '🎨',
    courseCount: 2,
    courseIds: ['2', '5'],              // React(beg) → UX/UI(inter)
    duration: '14h',
    level: 'beginner',
    tags: ['Figma', 'UX', 'UI', 'Design Systems'],
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'path-fullstack',
    title: 'Fullstack JavaScript Moderno',
    shortDescription: 'Domina el stack completo: React, Node.js, TypeScript y más.',
    longDescription:
      'La ruta más completa para convertirte en un Fullstack Developer. Aprenderás a construir tanto el frontend con React como el backend con Node.js, gestionarás bases de datos, implementarás autenticación y desplegarás aplicaciones completas a producción con CI/CD.',
    icon: '⚡',
    courseCount: 5,
    courseIds: ['2', '4', '7', '6', '3'], // React(beg) → Python(beg) → TS(inter) → DevOps(inter) → Node(adv)
    duration: '62h',
    level: 'all',
    tags: ['React', 'Node.js', 'TypeScript', 'Docker', 'CI/CD'],
    color: 'from-yellow-500 to-amber-500',
  },
];

@Injectable({ providedIn: 'root' })
export class PathService {
  getAll(): Observable<LearningPath[]> {
    return of(MOCK_PATHS);
  }

  getById(id: string): Observable<LearningPath | undefined> {
    return of(MOCK_PATHS.find(p => p.id === id));
  }
}

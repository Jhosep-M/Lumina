// features/codeforce-careers/services/job-offers.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import {
  JobOffer, JobFilters, EmploymentType, WorkModality, ExperienceLevel,
} from '../models/job-offer.model';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';

const PAGE_SIZE = 3;

/** Servicio mock de ofertas de trabajo con latencia simulada. */
@Injectable()
export class JobOffersService {
  private readonly loading = inject(LoadingService);
  private readonly toast = inject(ToastService);
  private readonly offers: JobOffer[] = MOCK_OFFERS;

  /**
   * Obtiene ofertas filtradas y paginadas.
   * @param filters Filtros actuales del feed.
   * @param page Número de página (0-indexed).
   */
  getOffers(filters: JobFilters, page: number): Observable<{ data: JobOffer[]; hasMore: boolean }> {
    this.loading.start();
    let filtered = [...this.offers];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.technologies.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filters.employmentType) {
      filtered = filtered.filter(o => o.employmentType === filters.employmentType);
    }
    if (filters.workModality) {
      filtered = filtered.filter(o => o.workModality === filters.workModality);
    }
    if (filters.experienceLevel) {
      filtered = filtered.filter(o => o.experienceLevel === filters.experienceLevel);
    }

    const start = page * PAGE_SIZE;
    const paged = filtered.slice(start, start + PAGE_SIZE);
    const hasMore = start + PAGE_SIZE < filtered.length;

    return of({ data: paged, hasMore }).pipe(
      delay(350),
      tap(() => this.loading.stop()),
      catchError(err => {
        this.loading.stop();
        this.toast.error('Error al cargar ofertas. Intenta de nuevo.');
        return throwError(() => err);
      })
    );
  }

  /** Obtiene una oferta por id */
  getOfferById(id: string): Observable<JobOffer | undefined> {
    return of(this.offers.find(o => o.id === id)).pipe(delay(200));
  }

  /** Incrementa likes localmente */
  toggleLike(id: string): Observable<JobOffer> {
    const offer = this.offers.find(o => o.id === id);
    if (!offer) return throwError(() => new Error('Oferta no encontrada'));
    offer.isLiked = !offer.isLiked;
    offer.stats.likes += offer.isLiked ? 1 : -1;
    return of({ ...offer }).pipe(delay(150));
  }

  /** Incrementa postulaciones */
  applyToOffer(id: string): Observable<JobOffer> {
    const offer = this.offers.find(o => o.id === id);
    if (!offer) return throwError(() => new Error('Oferta no encontrada'));
    offer.stats.applicants += 1;
    return of({ ...offer }).pipe(delay(150));
  }
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_OFFERS: JobOffer[] = [
  {
    id: 'cf-001',
    title: 'Senior Frontend Developer (Angular)',
    company: 'CodeForce Academy',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=CF&background=38BDF8&color=fff&size=64',
    location: 'LATAM (Remoto)',
    author: { name: 'Ana Torres', username: '@anatorres_cf', avatarUrl: 'https://ui-avatars.com/api/?name=AT&background=6366F1&color=fff', role: 'Head of Engineering' },
    description: 'Buscamos un/a desarrollador/a Senior Frontend con experiencia sólida en Angular 17+ para liderar la evolución de nuestra plataforma educativa. Trabajarás con un equipo distribuido en LATAM, construyendo experiencias de aprendizaje interactivas que impactan a miles de estudiantes.',
    requirements: ['5+ años de experiencia con Angular (standalone components, signals)', 'Dominio de TypeScript estricto', 'Experiencia con RxJS y programación reactiva', 'Conocimiento de TailwindCSS', 'Experiencia con testing (Jest/Vitest)', 'Inglés intermedio-avanzado'],
    responsibilities: ['Diseñar y desarrollar features core de la plataforma', 'Mentoría técnica al equipo junior', 'Code reviews y definición de estándares', 'Colaborar con UX para mejorar la experiencia del estudiante'],
    benefits: ['Trabajo 100% remoto', 'Horario flexible', 'Acceso gratuito a todos los cursos', 'Bono anual por desempeño', 'Equipo de última generación'],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'TailwindCSS', 'Node.js', 'Firebase'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Remote,
    experienceLevel: ExperienceLevel.Senior,
    salaryRange: { min: 4500, max: 7000, currency: 'USD', period: 'mensual' },
    stats: { views: 1240, likes: 87, comments: 12, shares: 34, applicants: 45 },
    isFeatured: true, isLiked: false,
    applyUrl: 'https://codeforceacademy.com/careers/senior-frontend',
    comments: [
      { id: 'c1', author: { name: 'Carlos Méndez', username: '@carlosdev', avatarUrl: 'https://ui-avatars.com/api/?name=CM&background=10B981&color=fff', role: 'Developer' }, content: '¡Excelente oportunidad! CodeForce tiene un equipo increíble. Muy recomendado.', createdAt: new Date(Date.now() - 2 * 86400000), likes: 5 },
      { id: 'c2', author: { name: 'Laura Vega', username: '@lauravega', avatarUrl: 'https://ui-avatars.com/api/?name=LV&background=F59E0B&color=fff', role: 'UX Designer' }, content: '¿Aceptan perfiles con 4 años de experiencia pero mucho Angular?', createdAt: new Date(Date.now() - 86400000), likes: 2 },
    ],
    createdAt: new Date(Date.now() - 3 * 86400000), updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'ml-002',
    title: 'Full Stack Developer (React + Node)',
    company: 'Mercado Libre',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=ML&background=FFE600&color=333&size=64',
    location: 'Buenos Aires, Argentina (Híbrido)',
    author: { name: 'Martín Ruiz', username: '@martinr_meli', avatarUrl: 'https://ui-avatars.com/api/?name=MR&background=3B82F6&color=fff', role: 'Tech Recruiter' },
    description: 'Sumate al equipo de Marketplace de Mercado Libre. Buscamos devs Full Stack apasionados por construir productos que usan millones de personas en toda América Latina. Stack principal: React, Node.js, y microservicios en la nube.',
    requirements: ['3+ años de experiencia Full Stack', 'React 18+ con hooks y context', 'Node.js con Express o Fastify', 'SQL y NoSQL (PostgreSQL, MongoDB)', 'Docker y CI/CD básico', 'Español nativo, inglés técnico'],
    responsibilities: ['Desarrollar features end-to-end', 'Participar en diseño de APIs REST', 'Optimizar rendimiento de aplicaciones de alto tráfico', 'Contribuir a la cultura de mejora continua'],
    benefits: ['Oficina premium en Buenos Aires', 'Descuentos en Mercado Libre', 'Plan de salud integral', 'Stock options', 'Capacitación continua'],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Hybrid,
    experienceLevel: ExperienceLevel.Mid,
    salaryRange: { min: 3500, max: 5500, currency: 'USD', period: 'mensual' },
    stats: { views: 3420, likes: 156, comments: 28, shares: 67, applicants: 120 },
    isFeatured: true, isLiked: false,
    applyUrl: 'https://mercadolibre.com/careers',
    comments: [
      { id: 'c3', author: { name: 'Diego Fernández', username: '@diegof', avatarUrl: 'https://ui-avatars.com/api/?name=DF&background=EF4444&color=fff', role: 'Backend Dev' }, content: 'Trabajé ahí 2 años, increíble cultura tech. 100% recomendado.', createdAt: new Date(Date.now() - 5 * 86400000), likes: 15 },
    ],
    createdAt: new Date(Date.now() - 5 * 86400000), updatedAt: new Date(Date.now() - 2 * 86400000),
  },
  {
    id: 'gl-003',
    title: 'Backend Engineer (Java + Spring Boot)',
    company: 'Globant',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=GL&background=A3E635&color=333&size=64',
    location: 'Bogotá, Colombia (Remoto)',
    author: { name: 'Valentina Ospina', username: '@valospina_gl', avatarUrl: 'https://ui-avatars.com/api/?name=VO&background=EC4899&color=fff', role: 'Engineering Manager' },
    description: 'Globant busca un Backend Engineer para unirse a un studio que trabaja con un cliente Fortune 500 del sector fintech. Construirás microservicios de alta disponibilidad con Java 21 y Spring Boot, desplegados en Kubernetes.',
    requirements: ['4+ años con Java (11+)', 'Spring Boot, Spring Cloud', 'Microservicios y event-driven architecture', 'Kubernetes y Docker', 'Testing con JUnit y Mockito', 'Inglés avanzado (interacción diaria con cliente)'],
    responsibilities: ['Diseñar y construir microservicios escalables', 'Implementar patrones de resiliencia (Circuit Breaker, Retry)', 'Participar en on-call rotation', 'Documentar APIs con OpenAPI'],
    benefits: ['Trabajo remoto desde cualquier país de LATAM', 'Certificaciones pagadas (AWS, GCP)', 'Bono por referidos', 'Días de bienestar', 'Plataforma de aprendizaje interna'],
    technologies: ['Java', 'Spring Boot', 'Kubernetes', 'Kafka', 'PostgreSQL', 'AWS'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Remote,
    experienceLevel: ExperienceLevel.Senior,
    salaryRange: { min: 5000, max: 8000, currency: 'USD', period: 'mensual' },
    stats: { views: 2100, likes: 98, comments: 15, shares: 42, applicants: 78 },
    isFeatured: false, isLiked: false,
    applyUrl: 'https://globant.com/careers',
    comments: [
      { id: 'c4', author: { name: 'Santiago López', username: '@santidev', avatarUrl: 'https://ui-avatars.com/api/?name=SL&background=8B5CF6&color=fff', role: 'Software Engineer' }, content: 'Globant tiene proyectos muy interesantes en fintech. Gran oportunidad.', createdAt: new Date(Date.now() - 3 * 86400000), likes: 8 },
    ],
    createdAt: new Date(Date.now() - 7 * 86400000), updatedAt: new Date(Date.now() - 3 * 86400000),
  },
  {
    id: 'rp-004',
    title: 'DevOps Engineer',
    company: 'Rappi',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=RP&background=FF6B35&color=fff&size=64',
    location: 'Ciudad de México (Híbrido)',
    author: { name: 'Javier Castillo', username: '@javiercast_rp', avatarUrl: 'https://ui-avatars.com/api/?name=JC&background=14B8A6&color=fff', role: 'SRE Lead' },
    description: 'Únete al equipo de infraestructura de Rappi. Automatizarás pipelines CI/CD, gestionarás clusters de Kubernetes y asegurarás la disponibilidad de servicios que atienden a millones de usuarios en toda LATAM.',
    requirements: ['3+ años en roles DevOps/SRE', 'Terraform, Ansible o Pulumi', 'Kubernetes en producción', 'AWS o GCP avanzado', 'Scripting (Bash, Python)', 'Monitoreo con Datadog o Prometheus'],
    responsibilities: ['Automatizar infraestructura como código', 'Gestionar pipelines CI/CD', 'Implementar observabilidad y alertas', 'Colaborar con equipos de desarrollo para optimizar deploys'],
    benefits: ['Modelo híbrido flexible', 'Créditos mensuales en Rappi', 'Seguro médico premium', 'Home office setup budget', 'Cultura startup + escala enterprise'],
    technologies: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Python', 'Datadog'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Hybrid,
    experienceLevel: ExperienceLevel.Mid,
    salaryRange: { min: 3800, max: 6000, currency: 'USD', period: 'mensual' },
    stats: { views: 890, likes: 45, comments: 8, shares: 19, applicants: 32 },
    isFeatured: false, isLiked: false,
    applyUrl: 'https://rappi.com/careers',
    comments: [
      { id: 'c5', author: { name: 'María González', username: '@mariag', avatarUrl: 'https://ui-avatars.com/api/?name=MG&background=F97316&color=fff', role: 'Cloud Engineer' }, content: 'El stack de infra de Rappi es muy moderno. Buen lugar para crecer.', createdAt: new Date(Date.now() - 4 * 86400000), likes: 4 },
    ],
    createdAt: new Date(Date.now() - 11 * 86400000), updatedAt: new Date(Date.now() - 4 * 86400000),
  },
  {
    id: 'nu-005',
    title: 'Mobile Developer (Flutter)',
    company: 'Nubank',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=NU&background=820AD1&color=fff&size=64',
    location: 'São Paulo, Brasil (Remoto)',
    author: { name: 'Renata Silva', username: '@renata_nu', avatarUrl: 'https://ui-avatars.com/api/?name=RS&background=D946EF&color=fff', role: 'Mobile Chapter Lead' },
    description: 'Nubank busca desarrolladores Flutter para construir la próxima generación de experiencias financieras móviles. Trabajarás en features que impactan a más de 90 millones de clientes en Brasil, México y Colombia.',
    requirements: ['3+ años con Flutter/Dart', 'Publicación de apps en App Store y Play Store', 'State management (Bloc, Riverpod)', 'Testing unitario e integración', 'Conocimiento de APIs REST y GraphQL', 'Portugués o español + inglés intermedio'],
    responsibilities: ['Desarrollar features móviles de alta calidad', 'Colaborar con diseño para implementar interfaces pixel-perfect', 'Optimizar rendimiento y tamaño de la app', 'Participar en tech talks y compartir conocimiento'],
    benefits: ['Trabajo 100% remoto', 'NuCash (bono en acciones)', 'Licencia parental extendida', 'Presupuesto de home office', 'Gympass'],
    technologies: ['Flutter', 'Dart', 'GraphQL', 'Firebase', 'Kotlin', 'Swift'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Remote,
    experienceLevel: ExperienceLevel.Mid,
    salaryRange: { min: 4000, max: 6500, currency: 'USD', period: 'mensual' },
    stats: { views: 1870, likes: 112, comments: 20, shares: 53, applicants: 89 },
    isFeatured: false, isLiked: false,
    applyUrl: 'https://nubank.com.br/careers',
    comments: [
      { id: 'c6', author: { name: 'Felipe Araujo', username: '@felipea', avatarUrl: 'https://ui-avatars.com/api/?name=FA&background=06B6D4&color=fff', role: 'Flutter Dev' }, content: 'Nubank invierte mucho en Flutter. El equipo mobile es de primer nivel.', createdAt: new Date(Date.now() - 6 * 86400000), likes: 11 },
      { id: 'c7', author: { name: 'Camila Rojas', username: '@camilar', avatarUrl: 'https://ui-avatars.com/api/?name=CR&background=F43F5E&color=fff', role: 'Product Designer' }, content: '¿Hay posiciones para Colombia también?', createdAt: new Date(Date.now() - 2 * 86400000), likes: 3 },
    ],
    createdAt: new Date(Date.now() - 9 * 86400000), updatedAt: new Date(Date.now() - 2 * 86400000),
  },
  {
    id: 'cf-006',
    title: 'UX/UI Designer',
    company: 'CodeForce Academy',
    companyLogoUrl: 'https://ui-avatars.com/api/?name=CF&background=38BDF8&color=fff&size=64',
    location: 'LATAM (Remoto)',
    author: { name: 'Ana Torres', username: '@anatorres_cf', avatarUrl: 'https://ui-avatars.com/api/?name=AT&background=6366F1&color=fff', role: 'Head of Engineering' },
    description: 'CodeForce Academy busca un/a diseñador/a UX/UI para rediseñar la experiencia de aprendizaje de nuestra plataforma. Trabajarás estrechamente con producto e ingeniería para crear interfaces intuitivas y visualmente impactantes.',
    requirements: ['3+ años de experiencia en UX/UI', 'Dominio de Figma', 'Portfolio con proyectos de plataformas web', 'Conocimiento de design systems', 'User research y testing de usabilidad', 'Español nativo'],
    responsibilities: ['Diseñar wireframes, prototipos y mockups de alta fidelidad', 'Crear y mantener el design system', 'Realizar tests de usabilidad', 'Colaborar con desarrollo frontend'],
    benefits: ['Trabajo 100% remoto', 'Horario flexible', 'Acceso gratuito a cursos', 'Equipo creativo y colaborativo'],
    technologies: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'CSS', 'Accessibility'],
    employmentType: EmploymentType.FullTime,
    workModality: WorkModality.Remote,
    experienceLevel: ExperienceLevel.Mid,
    salaryRange: { min: 3000, max: 5000, currency: 'USD', period: 'mensual' },
    stats: { views: 670, likes: 38, comments: 6, shares: 15, applicants: 22 },
    isFeatured: false, isLiked: false,
    applyUrl: 'https://codeforceacademy.com/careers/ux-designer',
    comments: [
      { id: 'c8', author: { name: 'Isabela Moreno', username: '@isabelam', avatarUrl: 'https://ui-avatars.com/api/?name=IM&background=A855F7&color=fff', role: 'UX Researcher' }, content: '¡Me encanta el producto! Muy interesada en aplicar.', createdAt: new Date(Date.now() - 1 * 86400000), likes: 7 },
    ],
    createdAt: new Date(Date.now() - 2 * 86400000), updatedAt: new Date(Date.now() - 86400000),
  },
];

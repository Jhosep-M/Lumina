// features/codeforce-careers/models/job-offer.model.ts
// ─────────────────────────────────────────────────────────────────────────────
// Modelo principal de ofertas de trabajo para CodeForce Careers.
// ─────────────────────────────────────────────────────────────────────────────

/** Tipos de empleo disponibles */
export enum EmploymentType {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Freelance = 'freelance',
  Internship = 'internship',
  Contract = 'contract',
}

/** Modalidad de trabajo */
export enum WorkModality {
  Remote = 'remoto',
  Hybrid = 'híbrido',
  OnSite = 'presencial',
}

/** Nivel de experiencia */
export enum ExperienceLevel {
  Junior = 'junior',
  Mid = 'mid',
  Senior = 'senior',
  Lead = 'lead',
  Architect = 'architect',
}

/** Autor/publicador de la oferta */
export interface JobAuthor {
  name: string;
  username: string;
  avatarUrl: string;
  role: string;
}

/** Comentario mock en una oferta */
export interface JobComment {
  id: string;
  author: JobAuthor;
  content: string;
  createdAt: Date;
  likes: number;
}

/** Estadísticas de interacción */
export interface JobStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  applicants: number;
}

/** Rango salarial */
export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'mensual' | 'anual';
}

/** Modelo completo de una oferta de trabajo */
export interface JobOffer {
  id: string;
  title: string;
  company: string;
  companyLogoUrl: string;
  location: string;
  author: JobAuthor;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  technologies: string[];
  employmentType: EmploymentType;
  workModality: WorkModality;
  experienceLevel: ExperienceLevel;
  salaryRange: SalaryRange;
  stats: JobStats;
  isFeatured: boolean;
  isLiked: boolean;
  applyUrl: string;
  comments: JobComment[];
  createdAt: Date;
  updatedAt: Date;
}

/** Filtros aplicables al feed */
export interface JobFilters {
  search: string;
  employmentType: EmploymentType | null;
  workModality: WorkModality | null;
  experienceLevel: ExperienceLevel | null;
}

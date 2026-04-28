// features/codeforce-careers/models/job-constants.ts
// ─────────────────────────────────────────────────────────────────────────────
// Opciones de filtros reutilizables y labels legibles para la UI.
// ─────────────────────────────────────────────────────────────────────────────
import { EmploymentType, WorkModality, ExperienceLevel } from './job-offer.model';

export interface FilterOption<T> {
  value: T;
  label: string;
}

export const EMPLOYMENT_TYPE_OPTIONS: FilterOption<EmploymentType>[] = [
  { value: EmploymentType.FullTime, label: 'Full-time' },
  { value: EmploymentType.PartTime, label: 'Part-time' },
  { value: EmploymentType.Freelance, label: 'Freelance' },
  { value: EmploymentType.Internship, label: 'Pasantía' },
  { value: EmploymentType.Contract, label: 'Contrato' },
];

export const WORK_MODALITY_OPTIONS: FilterOption<WorkModality>[] = [
  { value: WorkModality.Remote, label: 'Remoto' },
  { value: WorkModality.Hybrid, label: 'Híbrido' },
  { value: WorkModality.OnSite, label: 'Presencial' },
];

export const EXPERIENCE_LEVEL_OPTIONS: FilterOption<ExperienceLevel>[] = [
  { value: ExperienceLevel.Junior, label: 'Junior' },
  { value: ExperienceLevel.Mid, label: 'Mid-level' },
  { value: ExperienceLevel.Senior, label: 'Senior' },
  { value: ExperienceLevel.Lead, label: 'Lead' },
  { value: ExperienceLevel.Architect, label: 'Architect' },
];

/** Labels legibles para los enums */
export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  [EmploymentType.FullTime]: 'Full-time',
  [EmploymentType.PartTime]: 'Part-time',
  [EmploymentType.Freelance]: 'Freelance',
  [EmploymentType.Internship]: 'Pasantía',
  [EmploymentType.Contract]: 'Contrato',
};

export const WORK_MODALITY_LABELS: Record<WorkModality, string> = {
  [WorkModality.Remote]: 'Remoto',
  [WorkModality.Hybrid]: 'Híbrido',
  [WorkModality.OnSite]: 'Presencial',
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  [ExperienceLevel.Junior]: 'Junior',
  [ExperienceLevel.Mid]: 'Mid-level',
  [ExperienceLevel.Senior]: 'Senior',
  [ExperienceLevel.Lead]: 'Lead',
  [ExperienceLevel.Architect]: 'Architect',
};

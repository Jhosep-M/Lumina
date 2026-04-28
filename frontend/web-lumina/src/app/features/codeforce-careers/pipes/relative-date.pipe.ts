// features/codeforce-careers/pipes/relative-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforma un Date en texto relativo legible (ej. "hace 3 días").
 * Se usa en las tarjetas y modal de ofertas.
 */
@Pipe({ name: 'relativeDate', standalone: true, pure: true })
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const date = value instanceof Date ? value : new Date(value);
    const now = Date.now();
    const diffMs = now - date.getTime();

    if (diffMs < 0) return 'justo ahora';

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds < 60) return 'justo ahora';
    if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    if (days < 7) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    if (weeks < 5) return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
}

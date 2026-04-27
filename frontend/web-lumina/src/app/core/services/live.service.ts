import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap, shareReplay, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface LiveStatus {
  isLive: boolean;
  session?: any;
}

@Injectable({ providedIn: 'root' })
export class LiveService {
  private apiUrl = `${environment.apiUrl}/live/status`;

  // Polling cada 30 segundos (o mediante websockets si prefieres)
  private status$ = timer(0, 30_000).pipe(
    switchMap(() => this.http.get<LiveStatus>(this.apiUrl)),
    catchError(() => new BehaviorSubject({ isLive: false })),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  getStatus(): Observable<LiveStatus> {
    return this.status$;
  }

  // Si necesitas verificar rol antes de llamar, puedes añadir un guard,
  // pero el endpoint ya devuelve false si no es instructor/admin.
}
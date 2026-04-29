import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LiveService } from '../../core/services/live.service';

@Component({    
  selector: 'app-live',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent {
  private liveService = inject(LiveService);
}       
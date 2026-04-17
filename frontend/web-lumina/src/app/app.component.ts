import { Component, AfterViewInit } from '@angular/core';  // ← Agrega AfterViewInit
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
//import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {  // ← Implementa la interfaz
  title = 'LUMINA';

  // Agrega este método
  ngAfterViewInit() {
    const loading = document.querySelector('.loading') as HTMLElement;
    if (loading) loading.style.display = 'none';
  }
}
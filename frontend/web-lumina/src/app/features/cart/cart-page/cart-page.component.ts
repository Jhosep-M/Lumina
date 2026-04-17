import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  template: `
    <div class="cart-container">
      <h2>Tu carrito</h2>
      <p>Próximamente: aquí se listarán los cursos agregados.</p>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class CartPageComponent {}
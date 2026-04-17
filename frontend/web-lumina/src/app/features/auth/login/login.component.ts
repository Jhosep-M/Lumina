import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="auth-container">
      <h2>Iniciar sesión</h2>
      <form>
        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  `
})
export class LoginComponent {}
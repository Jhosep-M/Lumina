// src/app/core/models/menu-item.model.ts
export interface MenuItem {
  label: string;
  icon: string;        // clase de FontAwesome o Material Icon
  route?: string;      // ruta a la que navegar
  action?: () => void; // acción personalizada
  highlight?: boolean; // para el botón premium
  danger?: boolean;    // para cerrar sesión
}
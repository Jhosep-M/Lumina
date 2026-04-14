# 🚀 CodeForge Academy

Una plataforma educacional impulsada por **Lumina**.

> _«La tecnología suele ser oscura y difícil de entender. Lumina disipa las sombras iluminando el camino de los futuros profesionales tecnológicos con rutas de aprendizaje claras y directas.»_

**CodeForge** es una academia virtual integral de e-learning de formato suscripción. Está diseñada para optimizar la gestión de cursos para desarrolladores e impulsar el talento en IT, eliminando la fricción matemática y técnica entre las suscripciones, pagos automatizados y el acceso al contenido.

## 🛠️ Stack Tecnológico

- **Backend:** Laravel 11 (PHP) - API REST / Sanctum
- **Frontend:** Angular 17+ (TypeScript) - SPA
- **Base de Datos:** PostgreSQL
- **Marco de Trabajo:** Scrum (Jira)

## 👥 Equipo de Desarrollo

- Sebastian Salvador Blanco Vaca
- Emerson Raphael Mollo Isla
- Jhomar Edilson Mamani Huanca

---

## ⚙️ Requisitos Previos

Para levantar este entorno localmente, asegúrese de tener instalado:

- PHP >= 8.2
- Composer
- Node.js (LTS) y npm
- PostgreSQL

---

## 🚀 Instrucciones de Instalación

### 1. Configuración de la Base de Datos

1. Abra pgAdmin o DBeaver.
2. Cree una base de datos vacía llamada `lumina_db`.

### 2. Levantar el Backend (Laravel)

Abra una terminal en la raíz del proyecto y ejecute:

```bash
cd backend/api-lumina
composer install
cp .env.example .env
php artisan key:generate
```

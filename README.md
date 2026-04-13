# 💡 Proyecto Techpass Academy - Grupo Lumina

Bienvenido al repositorio oficial del **Grupo Lumina**. Este proyecto consta del desarrollo de un sistema web completo (Techpass Academy) utilizando un enfoque ágil (**Scrum**) abarcando 4 sprints.

## 🛠️ Stack Tecnológico

El proyecto cumple con los siguientes requerimientos técnicos acordados:
- **Backend:** Laravel (PHP) exponiendo una API REST.
- **Frontend:** Angular (TypeScript) implementado como una SPA (Single Page Application).
- **Base de Datos:** PostgreSQL (Estructura normalizada al menos hasta 3FN).
- **Metodología de Desarrollo:** Scrum con 4 sprints iterativos (1 semana c/u).
- **Control de Versiones:** Git mediante flujo de ramas por funcionalidad.

## 📁 Arquitectura del Repositorio

- `/backend`: Concentra toda la lógica del servidor, API y conexiones en Laravel.
- `/frontend`: Aplicación cliente (SPA) desarrollada con Angular.
- `/docs`: Documentación vital del ecosistema (Sprint 0). Contiene:
  - Diagrama UML arquitectónico.
  - Scripts SQL de creación inicial para PostgreSQL.
  - Documentos metodológicos (Actas, Product Backlog, etc).

## 👥 Integrantes (Lumina)

*   [Nombre del Integrante 1] - [Rol]
*   [Nombre del Integrante 2] - [Rol]
*   [Nombre del Integrante 3] - [Rol]

*(Nota: Rellenar los nombres y roles correspondientes)*

---

## 🚀 Instrucciones de Levantamiento (Entorno Local)

Para inicializar el proyecto en tu máquina local, sigue las instrucciones de cada entorno. *(Estas instrucciones cobrarán vida a medida que cada proyecto base se inicialice formalmente).*

### 1. Requisitos Previos
*   Tener instalado y configurado **PHP**, **Composer**, **Node.js** y **PostgreSQL**.

### 2. Base de Datos
1. Crear una base de datos aislada en PostgreSQL.
2. Ejecutar el script base ubicado en `/docs` para montar los esquemas iniciales (si aplica).

### 3. Backend (Laravel)
```bash
cd backend
# 1. Instalar dependencias
composer install
# 2. Copiar variables de entorno
cp .env.example .env
# 3. Generar la llave de la app
php artisan key:generate
# 4. Levantar el servidor
php artisan serve
```

### 4. Frontend (Angular)
```bash
cd frontend
# 1. Instalar dependencias
npm install
# 2. Levantar servidor local (SPA)
npm start # o ng serve
```

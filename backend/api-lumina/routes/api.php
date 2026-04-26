<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rutas de Autenticación agrupadas bajo el prefijo 'auth'
// Esto habilita los endpoints: /api/auth/register y /api/auth/login
Route::get('/test', function () {
    return response()->json(['message' => 'Conexión exitosa']);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Rutas protegidas (Requieren token de Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    
    // Ruta de logout (Ahora será /api/auth/logout si decides usar el mismo prefijo)
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
    
    // Rutas del CRUD de cursos (LUM-7)
    Route::apiResource('courses', CourseController::class);
    
    // Nueva ruta para inscripciones (LUM-8)
    Route::post('/courses/{id}/enroll', [RegistrationController::class, 'enroll']);
});
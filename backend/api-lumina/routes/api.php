<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RegistrationController; // <-- ¡Esta es la línea que faltaba!

// Rutas públicas (No requieren token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas (Requieren token de Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Con esta sola línea, Laravel crea las rutas GET, POST, PUT y DELETE para cursos
    Route::apiResource('courses', CourseController::class);
});

// Rutas protegidas (Requieren token de Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::apiResource('courses', CourseController::class);
    
    // Nueva ruta para inscripciones (LUM-8)
    Route::post('/courses/{id}/enroll', [RegistrationController::class, 'enroll']);
});

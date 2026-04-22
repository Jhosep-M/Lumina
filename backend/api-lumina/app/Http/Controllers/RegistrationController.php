<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function enroll(Request $request, $course_id)
    {
        // 1. Verificamos que el curso exista
        $course = Course::find($course_id);
        
        if (!$course) {
            return response()->json(['message' => 'Curso no encontrado'], 404);
        }

        // 2. Obtenemos al usuario automáticamente gracias a su Token
        $user = $request->user();

        // 3. Creamos el registro principal (La "boleta" de inscripción)
        $registration = new Registration();
        $registration->user_id = $user->id;
        $registration->status = 'active';
        $registration->save();

        // 4. Enganchamos el curso con el registro en la tabla pivote (course_enrollments)
        // Usamos los campos exactos que definiste en tu modelo Course.php
        $course->registrations()->attach($registration->id, [
            'progress' => 0,
            'final_grade' => null,
            'enrollment_date' => now()
        ]);

        return response()->json([
            'message' => 'Inscripción realizada con éxito',
            'course' => $course->title,
            'student' => $user->name
        ], 201);
    }
}
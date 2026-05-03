<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Course;
use App\Models\User;

class AdminDashboardController extends Controller
{
    /**
     * Devuelve las estadísticas principales del dashboard de administrador.
     */
    public function stats(Request $request)
    {
        // Solo para administradores: podrías verificar $request->user()->role === 'admin'
        if ($request->user() && $request->user()->role->nombre !== 'Admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $activeCourses = Course::where('is_active', true)->count(); // o usar lo que corresponda

        $totalUsers = User::count();
        $instructors = User::whereHas('role', function ($q) {
            $q->where('nombre', 'Instructor');
        })->count();

        // Ingresos: suma del precio de los cursos de todas las inscripciones
        // Por simplificar, si el curso cuesta, sumamos su precio por cada matrícula
        $revenue = \DB::table('course_enrollments')
            ->join('courses', 'course_enrollments.course_id', '=', 'courses.id')
            ->sum('courses.price');

        return response()->json([
            'active_courses' => $activeCourses,
            'total_users' => $totalUsers,
            'instructors' => $instructors,
            'revenue' => $revenue
        ]);
    }
}

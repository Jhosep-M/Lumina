<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Course;
use App\Models\User;

class MockCourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Asegurar que exista al menos una categoría
        $categoryId = DB::table('categories')->insertGetId([
            'name' => 'Programación',
            'description' => 'Cursos de desarrollo de software',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 2. Asegurar que exista al menos un instructor para asignarle los cursos
        $instructor = User::firstOrCreate(
            ['email' => 'instructor@lumina.com'],
            [
                'role_id' => 3, // Instructor
                'name' => 'Carlos López',
                'password' => bcrypt('password123'),
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

        $courses = [
            [
                'title' => 'Angular Avanzado: Patrones y RxJS',
                'description' => 'En este curso aprenderás a estructurar aplicaciones Angular escalables, implementar patrones de diseño modernos y dominar el uso de RxJS.',
                'duration' => 12,
                'level' => 'advanced',
                'price' => 49.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Introducción a React y Hooks',
                'description' => 'Descubre el ecosistema de React, aprende a crear componentes reutilizables, manejar el estado con Hooks y gestionar efectos secundarios.',
                'duration' => 8,
                'level' => 'beginner',
                'price' => 29.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Node.js y Microservicios',
                'description' => 'Aprende a diseñar y construir APIs robustas con Node.js, Express y MongoDB. Descubre cómo dividir un monolito en microservicios.',
                'duration' => 20,
                'level' => 'advanced',
                'price' => 59.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Fundamentos de Python',
                'description' => 'Aprende a programar desde cero con Python. Veremos estructuras de datos, control de flujo, funciones, POO.',
                'duration' => 10,
                'level' => 'beginner',
                'price' => 19.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Diseño UX/UI para Desarrolladores',
                'description' => 'Curso práctico donde aprenderás los principios del diseño de interfaces y experiencia de usuario. Aprenderás a usar Figma.',
                'duration' => 6,
                'level' => 'intermediate',
                'price' => 39.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'DevOps y CI/CD con GitHub Actions',
                'description' => 'Aprende las mejores prácticas de integración y entrega continua (CI/CD) utilizando GitHub Actions.',
                'duration' => 15,
                'level' => 'intermediate',
                'price' => 54.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mastering TypeScript',
                'description' => 'Domina los conceptos avanzados de TypeScript: genéricos, tipos condicionales, decoradores y utility types.',
                'duration' => 9,
                'level' => 'intermediate',
                'price' => 44.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Machine Learning Básico',
                'description' => 'Un curso introductorio donde aprenderás a entrenar tus primeros modelos de regresión y clasificación usando Scikit-Learn.',
                'duration' => 25,
                'level' => 'advanced',
                'price' => 69.99,
                'category_id' => $categoryId,
                'instructor_id' => $instructor->id,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('courses')->insert($courses);
    }
}

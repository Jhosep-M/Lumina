<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Creamos los roles definidos en tu lógica de negocio
        Role::create(['nombre' => 'Admin']);
        Role::create(['nombre' => 'Estudiante']);
        Role::create(['nombre' => 'Instructor']);
    }
}
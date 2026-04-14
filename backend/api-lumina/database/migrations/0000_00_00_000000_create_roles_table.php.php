<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // Este es tu id: int (PK)
            $table->string('nombre', 50); // Este es tu nombre: char(50)
            $table->timestamps(); // Crea automáticamente columnas de "fecha de creación" y "fecha de actualización" (muy útil)
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};

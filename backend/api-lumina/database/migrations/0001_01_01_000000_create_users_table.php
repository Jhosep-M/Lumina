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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            // Foreign Key a Roles (debe existir la tabla 'roles' antes de ejecutar esta)
            $table->foreignId('role_id')->constrained('roles'); 
            
            $table->string('name', 255);
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->string('phone', 20)->nullable();
            $table->string('avatar_url', 255)->nullable();
            $table->string('bio', 1000)->nullable();
            $table->string('date_of_birth', 10)->nullable(); // char(10) para YYYY-MM-DD
            $table->boolean('is_active')->default(true);
            
            // Campos de auditoría y control siguiendo tu formato char(20)
            $table->string('email_verified_at', 20)->nullable();
            $table->string('last_login_at', 20)->nullable();
            $table->string('deleted_at', 20)->nullable(); // Para borrado lógico
            
            $table->timestamps(); // Crea created_at y updated_at
        });

        // Estas tablas vienen por defecto en Laravel, puedes dejarlas o moverlas
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};

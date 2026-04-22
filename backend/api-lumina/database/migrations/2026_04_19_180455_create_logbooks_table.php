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
        Schema::create('logbooks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->string('action', 50);          
            $table->string('table_name', 100);     
            $table->unsignedBigInteger('record_id'); 
            
            // Usamos json o jsonb para PostgreSQL, es ideal para guardar objetos enteros
            $table->jsonb('old_data')->nullable(); 
            $table->jsonb('new_data')->nullable(); 
            
            $table->ipAddress('ip_address')->nullable(); 
            $table->timestamp('created_at')->useCurrent(); 
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logbooks');
    }
};

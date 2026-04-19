<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function courses() {
        return $this->belongsToMany(Course::class, 'course_enrollments')
                    ->withPivot('progress', 'final_grade', 'enrollment_date')
                    ->withTimestamps();
}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function minSubscriptionPlan() {
        return $this->belongsTo(SubscriptionPlan::class, 'min_subscription_id');
    }

    public function registrations() {
        return $this->belongsToMany(Registration::class, 'course_enrollments')
                    ->withPivot('progress', 'final_grade', 'enrollment_date');
    }
}

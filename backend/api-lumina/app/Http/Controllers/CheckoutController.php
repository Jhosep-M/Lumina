<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Course;

class CheckoutController extends Controller
{
    public function createSession(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        
        // Configurar la API key de Stripe
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // URL del frontend a donde redirigir
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:4200');

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $course->title,
                            'description' => $course->description,
                        ],
                        'unit_amount' => intval($course->price * 100), // En centavos
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => $frontendUrl . '/payment-success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $frontendUrl . '/payment-cancel',
                'customer_email' => $request->user()->email,
                'metadata' => [
                    'course_id' => $course->id,
                    'user_id' => $request->user()->id,
                ],
            ]);

            return response()->json(['id' => $session->id, 'url' => $session->url]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createSubscriptionSession(Request $request)
    {
        $planId = $request->input('plan_id'); // e.g., 'basic', 'expert', 'expert_duo'
        
        // Define plans dummy data
        $plans = [
            'basic' => ['name' => 'Plan Basic', 'price' => 39, 'interval' => 'month'],
            'expert' => ['name' => 'Plan Expert', 'price' => 249, 'interval' => 'year'],
            'expert_duo' => ['name' => 'Plan Expert Duo', 'price' => 349, 'interval' => 'year'],
        ];

        if (!array_key_exists($planId, $plans)) {
            return response()->json(['error' => 'Plan not found'], 404);
        }

        $plan = $plans[$planId];

        Stripe::setApiKey(env('STRIPE_SECRET'));
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:4200');

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $plan['name'],
                        ],
                        'unit_amount' => intval($plan['price'] * 100),
                        'recurring' => [
                            'interval' => $plan['interval'],
                        ],
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => $frontendUrl . '/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=' . $planId,
                'cancel_url' => $frontendUrl . '/premium?payment=cancelled',
                'customer_email' => $request->user()->email,
                'metadata' => [
                    'plan_id' => $planId,
                    'user_id' => $request->user()->id,
                ],
            ]);

            return response()->json(['id' => $session->id, 'url' => $session->url]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

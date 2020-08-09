<?php

namespace App\Http\Controllers;

use App\Repository\EloquentPizzaRepository;

class PizzaController extends Controller
{
    public function all(EloquentPizzaRepository $pizzaRepository)
    {
        return response()->json([
            'success' => true,
            'items' =>  $pizzaRepository->all()->toArray()
        ]);
    }
}

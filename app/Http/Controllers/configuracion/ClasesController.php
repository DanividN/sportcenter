<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClasesController extends Controller
{
    public function index()
    {
        return Inertia::render('clases/index');
    }

    public function create()
    {
        return Inertia::render('clases/form');
    }

    public function store(Request $request)
    {

         return redirect()
         ->route('clases.index')
         ->with('successMessage', '¡Clase creada correctamente!');
    }
}

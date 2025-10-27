<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AfiliadosController extends Controller
{
    public function index()
    {
        return Inertia::render('afiliados/index');
    }

    public function create()
    {
        return Inertia::render('afiliados/create');
    }

    public function assignment(){
        return Inertia::render('afiliados/assignment');
    }
}

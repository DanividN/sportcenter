<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrabajadoresController extends Controller
{
    public function index()
    {
        return Inertia::render('trabajadores/index');
    }

    public function create()
    {
        return Inertia::render('trabajadores/create');
    }
}

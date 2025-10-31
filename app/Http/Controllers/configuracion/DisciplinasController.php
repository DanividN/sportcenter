<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplinasController extends Controller
{
    public function index()
    {
        return Inertia::render('disciplinas/index');
    }

    public function create()
    {
        return Inertia::render('disciplinas/create');
    }
}

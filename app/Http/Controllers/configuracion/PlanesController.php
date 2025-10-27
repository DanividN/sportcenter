<?php

namespace App\Http\Controllers\configuracion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanesController extends Controller
{
    public function index()
    {
        return Inertia::render('planes/index');
    }
}

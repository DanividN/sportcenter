<?php

use App\Http\Controllers\configuracion\AfiliadosController;
use App\Http\Controllers\configuracion\ClasesController;
use App\Http\Controllers\configuracion\DisciplinasController;
use App\Http\Controllers\configuracion\PlanesController;
use App\Http\Controllers\configuracion\TrabajadoresController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canResetPassword' => Features::enabled(Features::resetPasswords()),
        'status' => session('status'),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('clases', [ClasesController::class, 'index'])->name('clases.index');
    Route::get('clases/crear', [ClasesController::class, 'create'])->name('clases.crear');
    Route::post('clases', [ClasesController::class, 'store'])->name('clases.store');

    Route::get('trabajadores', [TrabajadoresController::class, 'index'])->name('trabajadores.index');
    Route::get('trabajadores/crear', [TrabajadoresController::class, 'create'])->name('trabajadores.crear');
    Route::post('trabajadores', [TrabajadoresController::class, 'store'])->name('trabajadores.store');

    Route::get('afiliados', [AfiliadosController::class, 'index'])->name('afiliados.index');
    Route::get('afiliados/crear', [AfiliadosController::class, 'create'])->name('afiliados.crear');
    Route::post('afiliados', [AfiliadosController::class, 'store'])->name('afiliados.store');
    Route::get('afiliados/asignaciones', [AfiliadosController::class, 'assignment'])->name('afiliados.assignment');

    Route::get('disciplinas', [DisciplinasController::class, 'index'])->name('disciplinas.index');
    Route::get('disciplinas/crear', [DisciplinasController::class, 'create'])->name('disciplinas.crear');

    Route::get('planes', [PlanesController::class, 'index'])->name('planes.index');


});

require __DIR__.'/settings.php';

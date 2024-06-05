<?php

use App\Http\Controllers\EtudiantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/etudiants', [EtudiantController::class, 'index']);
Route::get('/etudiants/{id}', [EtudiantController::class, 'show']);
Route::post('/etudiants/store', [EtudiantController::class, 'store']);
Route::put('/etudiants/update/{id}', [EtudiantController::class, 'update']);
Route::delete('/etudiants/delete/{id}', [EtudiantController::class, 'destroy']);
Route::post('/etudiants/restore/{id}', [EtudiantController::class, 'restore']);


<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::apiResource('todos', TodoController::class);
Route::patch('/todos/{todo}/complete', [TodoController::class, 'markComplete']);
Route::patch('/todos/{todo}/incomplete', [TodoController::class, 'markIncomplete']);

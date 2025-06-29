<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $validated['completed'] = false;

        $todo = Todo::create($validated);

        return response()->json($todo, 201);
    }

    public function markIncomplete(Todo $todo)
    {
        $todo->completed = false;
        $todo->save();

        return response()->json($todo);
    }

    public function markComplete(Todo $todo)
    {
        $todo->completed = true;
        $todo->save();

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->noContent();
    }
}

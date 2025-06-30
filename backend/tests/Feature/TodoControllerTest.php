<?php

namespace Tests\Feature;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_todos()
    {
        Todo::factory()->count(3)->create();

        $response = $this->getJson('/api/todos');

        $response->assertOk()
            ->assertJsonCount(3);
    }

    public function test_store_creates_todo()
    {
        $data = ['title' => 'Test todo'];

        $response = $this->postJson('/api/todos', $data);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'title' => 'Test todo',
                'completed' => false,
            ]);

        $this->assertDatabaseHas('todos', ['title' => 'Test todo', 'completed' => false]);
    }

    public function test_markComplete_sets_completed_true()
    {
        $todo = Todo::factory()->create(['completed' => false]);

        $response = $this->patchJson("/api/todos/{$todo->id}/complete");

        $response->assertOk()
            ->assertJsonFragment(['completed' => true]);

        $this->assertTrue(Todo::find($todo->id)->completed);
    }

    public function test_markIncomplete_sets_completed_false()
    {
        $todo = Todo::factory()->create(['completed' => true]);

        $response = $this->patchJson("/api/todos/{$todo->id}/incomplete");

        $response->assertOk()
            ->assertJsonFragment(['completed' => false]);

        $this->assertFalse(Todo::find($todo->id)->completed);
    }

    public function test_destroy_deletes_todo()
    {
        $todo = Todo::factory()->create();

        $response = $this->deleteJson("/api/todos/{$todo->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }
}

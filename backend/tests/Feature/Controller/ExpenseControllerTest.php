<?php

namespace Tests\Feature\Controller;

use App\Models\Currency;
use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Database\Seeders\CurrencySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([CurrencySeeder::class]);

        $this->user = User::factory()->hasExpenses(5)->create();
        $this->currency = Currency::where('code', 'IDR')->first();
    }

    public function test_index_with_valid_data()
    {
        $this->actingAs($this->user);

        $response = $this->getJson('/api/expenses');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'date',
                    'description',
                    'amount',
                    'currency' => [
                        'id',
                        'code',
                        'name',
                        'symbol',
                    ],
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }

    public function test_index_with_different_user()
    {
        $newUser = User::factory()->hasExpenses(3)->create();

        $this->actingAs($this->user);

        $response = $this->getJson('/api/expenses');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');

        $this->actingAs($newUser);

        $response = $this->getJson('/api/expenses');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function test_store_with_valid_data()
    {
        $this->actingAs($this->user);

        $expense = Expense::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->postJson('/api/expenses', $expense->toArray());

        $response->assertStatus(201);

        $response->assertJsonPath('data.description', $expense->description);
        $response->assertJsonPath('data.amount', $expense->amount);
        $response->assertJsonPath('data.currency.id', $this->currency->id);
        $response->assertJsonPath('data.date', $expense->date);

        $this->assertDatabaseHas('expenses', [
            'description' => $expense->description,
            'amount' => $expense->amount,
            'currency_id' => $this->currency->id,
            'date' => $expense->date,
        ]);
    }

    public function test_show_with_valid_data()
    {
        $this->actingAs($this->user);

        $expense = $this->user->expenses()->first();

        $response = $this->getJson("/api/expenses/{$expense->id}");

        $response->assertStatus(200);

        $response->assertJsonPath('data.description', $expense->description);
        $response->assertJsonPath('data.amount', $expense->amount);
        $response->assertJsonPath('data.currency.id', $expense->currency_id);
        $response->assertJsonPath('data.date', $expense->date);

        $this->assertDatabaseHas('expenses', [
            'description' => $expense->description,
            'amount' => $expense->amount,
            'currency_id' => $expense->currency_id,
            'date' => $expense->date,
        ]);
    }

    public function test_show_with_different_user()
    {
        $expense = $this->user->expenses()->first();
        $newUser = User::factory()->create();

        $this->actingAs($newUser);

        $response = $this->getJson("/api/expenses/{$expense->id}");

        $response->assertStatus(401);
    }

    public function test_update_with_valid_data()
    {
        $this->actingAs($this->user);

        $expense = $this->user->expenses()->first();

        $newExpense = Expense::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->putJson("/api/expenses/{$expense->id}", $newExpense->toArray());

        $response->assertStatus(200);

        $response->assertJsonPath('data.description', $newExpense->description);
        $response->assertJsonPath('data.amount', $newExpense->amount);
        $response->assertJsonPath('data.currency.id', $this->currency->id);
        $response->assertJsonPath('data.date', $newExpense->date);

        $this->assertDatabaseHas('expenses', [
            'description' => $newExpense->description,
            'amount' => $newExpense->amount,
            'currency_id' => $this->currency->id,
            'date' => $newExpense->date,
        ]);
    }

    public function test_update_with_different_user()
    {
        $newUser = User::factory()->create();
        $expense = $this->user->expenses()->first();

        $this->actingAs($newUser);

        $newExpense = Expense::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->putJson("/api/expenses/{$expense->id}", $newExpense->toArray());

        $response->assertStatus(401);
    }

    public function test_delete_with_valid_data()
    {
        $this->actingAs($this->user);

        $expense = $this->user->expenses()->first();

        $response = $this->deleteJson("/api/expenses/{$expense->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('expenses', ['id' => $expense->id]);
    }

    public function test_delete_with_different_user()
    {
        $newUser = User::factory()->create();
        $expense = $this->user->expenses()->first();

        $this->actingAs($newUser);

        $response = $this->deleteJson("/api/expenses/{$expense->id}");

        $response->assertStatus(401);
    }
}

<?php

namespace Tests\Feature\Controller;

use App\Models\Currency;
use App\Models\Income;
use App\Models\User;
use Database\Seeders\CurrencySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IncomeControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user, $currency;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([CurrencySeeder::class]);

        $this->user = User::factory()->hasIncomes(5)->create();
        $this->currency = Currency::where('code', 'IDR')->first();
    }

    public function test_index_with_valid_data()
    {
        $this->actingAs($this->user);

        $response = $this->getJson('/api/incomes');

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

        // Check if the data is sorted by date descending
        $response->assertJsonPath('data.0.id', $this->user->incomes()->orderBy('date', 'desc')->first()->id);
        $response->assertJsonPath('data.4.id', $this->user->incomes()->orderBy('date', 'asc')->first()->id);
    }

    public function test_index_with_different_user()
    {
        $newUser = User::factory()->hasIncomes(3)->create();

        $this->actingAs($this->user);

        $response = $this->getJson('/api/incomes');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');

        $this->actingAs($newUser);

        $response = $this->getJson('/api/incomes');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function test_store_with_valid_data()
    {
        $this->actingAs($this->user);

        $income = Income::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->postJson('/api/incomes', $income->toArray());

        $response->assertStatus(201);

        $response->assertJsonPath('data.description', $income->description);
        $response->assertJsonPath('data.amount', intval($income->amount));
        $response->assertJsonPath('data.currency.id', $this->currency->id);
        $response->assertJsonPath('data.date', $income->date);

        $this->assertDatabaseHas('incomes', [
            'description' => $income->description,
            'amount' => $income->amount,
            'currency_id' => $this->currency->id,
            'date' => $income->date,
        ]);
    }

    public function test_show_with_valid_data()
    {
        $this->actingAs($this->user);

        $income = $this->user->incomes()->first();

        $response = $this->getJson("/api/incomes/{$income->id}");

        $response->assertStatus(200);

        $response->assertJsonPath('data.description', $income->description);
        $response->assertJsonPath('data.amount', intval($income->amount));
        $response->assertJsonPath('data.currency.id', $income->currency_id);
        $response->assertJsonPath('data.date', $income->date);

        $this->assertDatabaseHas('incomes', [
            'description' => $income->description,
            'amount' => $income->amount,
            'currency_id' => $income->currency_id,
            'date' => $income->date,
        ]);
    }

    public function test_show_with_different_user()
    {
        $income = $this->user->incomes()->first();
        $newUser = User::factory()->create();

        $this->actingAs($newUser);

        $response = $this->getJson("/api/incomes/{$income->id}");

        $response->assertStatus(401);
    }

    public function test_update_with_valid_data()
    {
        $this->actingAs($this->user);

        $income = $this->user->incomes()->first();

        $newIncome = Income::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->putJson("/api/incomes/{$income->id}", $newIncome->toArray());

        $response->assertStatus(200);

        $response->assertJsonPath('data.description', $newIncome->description);
        $response->assertJsonPath('data.amount', intval($newIncome->amount));
        $response->assertJsonPath('data.currency.id', $this->currency->id);
        $response->assertJsonPath('data.date', $newIncome->date);

        $this->assertDatabaseHas('incomes', [
            'description' => $newIncome->description,
            'amount' => $newIncome->amount,
            'currency_id' => $this->currency->id,
            'date' => $newIncome->date,
        ]);
    }

    public function test_update_with_different_user()
    {
        $newUser = User::factory()->create();
        $income = $this->user->incomes()->first();

        $this->actingAs($newUser);

        $newIncome = Income::factory()->make([
            'user_id' => $this->user->id,
            'currency_id' => $this->currency->id,
        ]);

        $response = $this->putJson("/api/incomes/{$income->id}", $newIncome->toArray());

        $response->assertStatus(401);
    }

    public function test_delete_with_valid_data()
    {
        $this->actingAs($this->user);

        $income = $this->user->incomes()->first();

        $response = $this->deleteJson("/api/incomes/{$income->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('incomes', ['id' => $income->id]);
    }

    public function test_delete_with_different_user()
    {
        $newUser = User::factory()->create();
        $income = $this->user->incomes()->first();

        $this->actingAs($newUser);

        $response = $this->deleteJson("/api/incomes/{$income->id}");

        $response->assertStatus(401);
    }
}

<?php

namespace Tests\Feature\Controller;

use App\Models\Expense;
use App\Models\User;
use Carbon\Carbon;
use Database\Seeders\CurrencySeeder;
use Database\Seeders\ExpenseSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExpenseReportControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow(Carbon::create(2021, 12, 30));

        $this->seed([CurrencySeeder::class, UserSeeder::class, ExpenseSeeder::class]);

        $this->user = User::first();
    }

    public function test_get_total_income_expenses_weekly()
    {
        $this->actingAs($this->user);

        $actualIncome = 0;
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfWeek()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/weekly');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $response->assertJsonPath('data.total_income', $actualIncome);
        $response->assertJsonPath('data.total_expenses', $actualExpenses);
    }

    public function test_get_total_income_expenses_monthly()
    {
        $this->actingAs($this->user);

        $actualIncome = 0;
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/monthly');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $response->assertJsonPath('data.total_income', $actualIncome);
        $response->assertJsonPath('data.total_expenses', $actualExpenses);
    }

    public function test_get_total_income_expenses_yearly()
    {
        $this->actingAs($this->user);

        $actualIncome = 0;
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfYear()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/yearly');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $response->assertJsonPath('data.total_income', $actualIncome);
        $response->assertJsonPath('data.total_expenses', $actualExpenses);
    }
}

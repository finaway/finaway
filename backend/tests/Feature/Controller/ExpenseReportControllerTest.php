<?php

namespace Tests\Feature\Controller;

use App\Models\Expense;
use App\Models\Income;
use App\Models\User;
use Carbon\Carbon;
use Database\Seeders\CurrencySeeder;
use Database\Seeders\ExpenseSeeder;
use Database\Seeders\IncomeSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Constraint\IsType;
use Tests\TestCase;

class ExpenseReportControllerTest extends TestCase
{
    use RefreshDatabase;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow(Carbon::create(2021, 12, 30));

        $this->seed([CurrencySeeder::class, UserSeeder::class, ExpenseSeeder::class, IncomeSeeder::class]);

        $this->user = User::first();
    }

    public function test_get_total_income_expenses_weekly()
    {
        $this->actingAs($this->user);

        $actualIncome = Income::where('date', '>=', Carbon::now()->startOfWeek()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfWeek()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/weekly');
        $responseData = $response->json('data');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $this->assertThat($responseData['total_income'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));
        $this->assertThat($responseData['total_expenses'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));

        $this->assertEquals($actualIncome, floatval($responseData['total_income']));
        $this->assertEquals($actualExpenses, floatval($responseData['total_expenses']));
    }

    public function test_get_total_income_expenses_monthly()
    {
        $this->actingAs($this->user);

        $actualIncome = Income::where('date', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfMonth()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/monthly');
        $responseData = $response->json('data');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $this->assertThat($responseData['total_income'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));
        $this->assertThat($responseData['total_expenses'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));

        $this->assertEquals($actualIncome, floatval($responseData['total_income']));
        $this->assertEquals($actualExpenses, floatval($responseData['total_expenses']));
    }

    public function test_get_total_income_expenses_yearly()
    {
        $this->actingAs($this->user);

        $actualIncome = Income::where('date', '>=', Carbon::now()->startOfYear()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');
        $actualExpenses = Expense::where('date', '>=', Carbon::now()->startOfYear()->format('Y-m-d'))
            ->where('date', '<=', Carbon::now()->format('Y-m-d'))
            ->where('user_id', $this->user->id)
            ->sum('amount');

        $response = $this->getJson('/api/expenses/reports/income/yearly');
        $responseData = $response->json('data');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'total_income',
                'total_expenses',
            ],
        ]);

        $this->assertThat($responseData['total_income'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));
        $this->assertThat($responseData['total_expenses'], $this->logicalOr(
            new IsType(IsType::TYPE_INT),
            new IsType(IsType::TYPE_FLOAT)
        ));

        $this->assertEquals($actualIncome, floatval($responseData['total_income']));
        $this->assertEquals($actualExpenses, floatval($responseData['total_expenses']));
    }
}

<?php

namespace Tests\Feature\Controller;

use App\Models\User;
use Database\Seeders\CurrencySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CurrencyControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([CurrencySeeder::class]);

        $this->user = User::factory()->create();
    }

    public function testIndex()
    {
        $response = $this->actingAs($this->user)->getJson('/api/currencies');

        $response->assertOk();
        $response->assertJsonCount(2, 'data');

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'code',
                    'symbol',
                ],
            ],
        ]);
    }
}

<?php

namespace Tests\Feature\Controller;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_register()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'testuser@example.test',
        ]);

        $response->assertJsonPath('data.user.name', 'Test User');
        $response->assertJsonPath('data.user.email', 'testuser@example.test');

        $response->assertJsonStructure(['data' => ['token']]);
    }

    public function test_register_with_invalid_data()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.test',
            'password' => 'password',
            'password_confirmation' => 'password1',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(['errors' => ['password']]);
    }

    public function test_register_with_existing_email()
    {
        User::factory()->create(['email' => 'testuser@example.test']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.test',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure(['errors' => ['email']]);
    }

    public function test_login()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200);

        $response->assertJsonPath('data.user.name', $user->name);
        $response->assertJsonPath('data.user.email', $user->email);

        $response->assertJsonStructure([
            'data' => [
                'token',
            ],
        ]);
    }

    public function test_login_with_invalid_data()
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'wrong@example.test',
            'password' => 'password',
        ]);

        $response->assertStatus(401);
        $response->assertJsonStructure(['message']);
    }
}

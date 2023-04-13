<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $today = now();

        $userIds = User::pluck('id');

        foreach ($userIds as $userId) {
            $dateTwoMonthsAgo = $today->copy()->subMonths(2);

            // Create data for the past 2 years
            Expense::factory(100)->create(['user_id' => $userId]);

            // Create data for each week in the last 2 months
            while ($dateTwoMonthsAgo->lte($today)) {
                Expense::factory(2)->create(['user_id' => $userId, 'date' => $dateTwoMonthsAgo->format('Y-m-d')]);
                $dateTwoMonthsAgo->addWeek();
            }

            // Create data for this week
            Expense::factory(3)->create(['user_id' => $userId, 'date' => $today->format('Y-m-d')]);
        }
    }
}

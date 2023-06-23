<?php

namespace Database\Seeders;

use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncomeSeeder extends Seeder
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
            Income::factory(100)->create(['user_id' => $userId]);

            // Create data for each week in the last 2 months
            while ($dateTwoMonthsAgo->lte($today)) {
                Income::factory(2)->create(['user_id' => $userId, 'date' => $dateTwoMonthsAgo->format('Y-m-d')]);
                $dateTwoMonthsAgo->addWeek();
            }

            // Create data for this week
            Income::factory(3)->create(['user_id' => $userId, 'date' => $today->format('Y-m-d')]);
        }
    }
}

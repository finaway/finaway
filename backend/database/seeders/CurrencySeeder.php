<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Rupiah',
                'code' => 'IDR',
                'symbol' => 'Rp',
            ],
            [
                'name' => 'US Dollar',
                'code' => 'USD',
                'symbol' => '$',
            ],
        ];

        foreach ($data as $item) {
            \App\Models\Currency::create($item);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\Income\StoreIncomeRequest;
use App\Http\Requests\Income\UpdateIncomeRequest;
use App\Models\Income;

class IncomeController extends Controller
{
    public function index()
    {
        $userId = auth()->user()->id;
        $data = Income::with('currency')
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    public function store(StoreIncomeRequest $request)
    {
        $validated = $request->validated();

        $income = new Income($validated);
        $income->user_id = auth()->user()->id;
        $income->save();

        $income->load('currency');

        return response()->json([
            'data' => $income,
        ], 201);
    }

    public function show(Income $income)
    {
        $userId = auth()->user()->id;

        if ($income->user_id !== $userId) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $income->load('currency');

        return response()->json([
            'data' => $income,
        ]);
    }

    public function update(UpdateIncomeRequest $request, Income $income)
    {
        if ($income->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $validated = $request->validated();

        $income->update($validated);
        $income->load('currency');

        return response()->json([
            'data' => $income,
        ]);
    }

    public function destroy(Income $income)
    {
        if ($income->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $income->delete();

        return response()->json([
            'data' => $income,
        ], 204);
    }
}

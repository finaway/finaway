<?php

namespace App\Http\Controllers;

use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Requests\Expense\UpdateExpenseRequest;
use App\Models\Expense;

class ExpenseController extends Controller
{
    public function index()
    {
        $userId = auth()->user()->id;
        $data = Expense::with('currency')->where('user_id', $userId)->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();

        $expense = new Expense($validated);
        $expense->user_id = auth()->user()->id;
        $expense->save();

        $expense->load('currency');

        return response()->json([
            'data' => $expense,
        ], 201);
    }

    public function show(Expense $expense)
    {
        $userId = auth()->user()->id;

        if ($expense->user_id !== $userId) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $expense->load('currency');

        return response()->json([
            'data' => $expense,
        ]);
    }

    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        if ($expense->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $validated = $request->validated();

        $expense->update($validated);
        $expense->load('currency');

        return response()->json([
            'data' => $expense,
        ]);
    }

    public function destroy(Expense $expense)
    {
        if ($expense->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $expense->delete();

        return response()->json([
            'data' => $expense,
        ], 204);
    }
}

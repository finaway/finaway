<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseReportController extends Controller
{
    /**
     * Get total income and expenses.
     */
    public function getTotalIncomeExpenses(Request $request, $type)
    {
        $user = $request->user();
        $now = now();
        $startDate = null;
        $endDate = $now->format('Y-m-d');

        switch ($type) {
            case 'weekly':
                $startDate = $now->startOfWeek()->format('Y-m-d');
                break;
            case 'monthly':
                $startDate = $now->startOfMonth()->format('Y-m-d');
                break;
            case 'yearly':
                $startDate = $now->startOfYear()->format('Y-m-d');
                break;
            default:
                // return error
                return response()->json([
                    'message' => 'Invalid type',
                ], 400);
        }

        $totalIncome = 0;

        $totalExpenses = Expense::where('user_id', $user->id)
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('amount');

        return response()->json([
            'data' => [
                'total_income' => floatval($totalIncome),
                'total_expenses' => floatval($totalExpenses),
            ],
        ]);
    }
}

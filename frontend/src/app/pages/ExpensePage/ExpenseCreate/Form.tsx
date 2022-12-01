import { Currency } from 'models';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export type FormValues = {
  description: string;
  date: string;
  amount: number;
  currency_id: number;
};

type FormProps = {
  currencies: Currency[];
  errors: {
    message?: string;
  };
  loadings: {
    creating: boolean;
    currencies_fetching: boolean;
  };
  onSubmit: SubmitHandler<FormValues>;
};

export function Form({ currencies, loadings, onSubmit }: FormProps) {
  const { register, handleSubmit } = useForm<FormValues>({});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          {...register('description')}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input type="date" id="date" {...register('date')} />
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          {...register('amount')}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="currency">Currency</label>
        <select id="currency" {...register('currency_id')}>
          <option value="">
            {loadings.currencies_fetching
              ? 'Loading currencies...'
              : '--- Choose Currency ---'}{' '}
          </option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.id}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={loadings.creating}>
        {loadings.creating ? 'Loading ...' : 'Create'}
      </button>

      <Link to="/expense">Back</Link>
    </form>
  );
}

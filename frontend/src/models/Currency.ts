import { SelectOption } from 'types/SelectOption';

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

export function currenciesToOptions(currencies: Currency[]): SelectOption[] {
  return currencies.map(currency => ({
    value: currency.id,
    label: `${currency.name} ${currency.symbol}`,
  }));
}

export function formatCurrency(value: number): string {
  let nf = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return nf.format(value);
}

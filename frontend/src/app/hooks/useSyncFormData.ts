import { useEffect } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

export function useSyncFormData<T extends FieldValues>(
  formMethods: UseFormReturn<T>,
  data: T | null,
) {
  useEffect(() => {
    if (data) {
      formMethods.reset({ ...data });
    } else {
      formMethods.reset();
    }
  }, [formMethods, data]);
}

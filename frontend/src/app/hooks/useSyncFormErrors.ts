import { useEffect } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export function useSyncFormErrors<T extends FieldValues>(
  formMethods: UseFormReturn<T>,
  errors: { [key: string]: string[] },
) {
  // Sync errors from redux to useForm
  useEffect(() => {
    Object.entries(errors).forEach(([key, value]) => {
      formMethods.setError(key as Path<T>, {
        type: 'manual',
        message: value?.[0],
      });
    });
  }, [errors, formMethods]);
}

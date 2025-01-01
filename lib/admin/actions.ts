'use server';

import type { AddEmployeeFormState } from '@/lib/admin/definitions';

export const AddEmployee = async (state: AddEmployeeFormState, formData: FormData) => {
  try {
    const response = await fetch('/api/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to add employee');
    return { message: 'Failed to add employee' };
  }
};

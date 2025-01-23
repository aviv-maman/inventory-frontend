'use client';

import { Fragment, useState } from 'react';
import { UserManagementForm } from '@/components/UserManagementForm';
import { UserManagementTable } from '@/components/UserManagementTable';
import { getUsers } from '@/lib/admin/actions';
import { updateURLParams } from '@/lib/utils';
import type { User } from '@/types/general';

interface UserManagementBlockProps {
  users?: User[] | null;
  totalPages?: number;
}

const UserManagementBlock: React.FC<UserManagementBlockProps> = ({ users, totalPages = 0 }) => {
  const [formState, setFormState] = useState({ isLoading: false, message: '', data: users });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    const target = event.target as typeof event.target & {
      name: { value: string };
      role: [{ selectedOptions: HTMLCollection & [{ value: string }] }];
      active: [{ value: string }];
    };
    let roles = '';
    const arrRoles = Array.from({ length: target.role[0].selectedOptions.length });
    arrRoles.forEach((item, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      index === 0
        ? (roles += target.role[0].selectedOptions[index].value)
        : (roles += `,${target.role[0].selectedOptions[index].value}`);
    });
    const active = target.active[0].value === 'all' ? undefined : target.active[0].value === 'active' ? true : false;
    const activeStr = active ? 'true' : 'false';

    try {
      const result = await getUsers({
        page: 1,
        limit: 10,
        name: target.name.value,
        role: roles,
        active,
      });
      const message = 'message' in result ? result.message : '';
      setFormState((prevState) => ({ ...prevState, data: result.data, message }));
      updateURLParams({ params: { name: target.name.value, role: roles, active: activeStr } });
    } catch (error: any) {
      setFormState((prevState) => ({ ...prevState, message: error.message }));
    } finally {
      setFormState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  return (
    <Fragment>
      <UserManagementForm onSubmit={onSubmit} isLoading={formState.isLoading} />
      <UserManagementTable users={formState.data} totalPages={totalPages} />
    </Fragment>
  );
};

export default UserManagementBlock;

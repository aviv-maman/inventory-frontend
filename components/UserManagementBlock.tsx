'use client';

import { Fragment, useState } from 'react';
import { UserManagementForm } from '@/components/UserManagementForm';
import { UserManagementTable } from '@/components/UserManagementTable';
import { getUsers } from '@/lib/admin/requests';
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
      role: [{ selectedOptions: HTMLCollection & [{ value?: string }] }];
      active: [{ value: string }];
    };
    let roles = '' as string | undefined;
    const arrRoles = Array.from({ length: target.role[0].selectedOptions.length });
    arrRoles.forEach((item, index) => {
      const value = target.role[0].selectedOptions[index].value;
      if (value) {
        if (index === 0) {
          roles += value;
        } else {
          roles += `,${value}`;
        }
      }
    });

    const active = target.active[0].value === 'all' ? undefined : target.active[0].value === 'active' ? true : false;
    const activeStr = active === undefined ? undefined : active ? 'true' : 'false';

    try {
      const result = await getUsers({
        page: 1,
        limit: 10,
        name: target.name.value,
        role: roles,
        active,
      });
      const message = 'error' in result ? result.error.message : '';
      setFormState((prevState) => ({ ...prevState, data: result.data, message }));
      updateURLParams({
        params: { name: target.name.value, role: roles?.length ? roles : undefined, active: activeStr },
      });
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

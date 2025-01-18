'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { createURLString } from '@/lib/utils';
import type { Category } from '@/types/general';

type CategoryBreadcrumbsProps = {
  ancestors?: Category['ancestors'];
};

export const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({ ancestors = [] }) => {
  const pathname = usePathname();
  const searchParams = { category: '' };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {ancestors?.map(
          (ancestor, index) => (
            index > 0 && (searchParams.category = ancestor._id),
            (
              <Fragment key={ancestor._id}>
                <BreadcrumbItem id={`BreadcrumbItem-${index}`}>
                  <BreadcrumbLink href={createURLString(pathname, index > 0 ? searchParams : undefined)}>
                    {ancestor.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < ancestors.length - 1 && <BreadcrumbSeparator id={`BreadcrumbSeparator-${index}`} />}
              </Fragment>
            )
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

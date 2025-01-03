'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { createUrl } from '@/lib/utils';
import type { Category } from '@/types/general';

type CategoryBreadcrumbsProps = {
  ancestors?: Category['ancestors'];
};

export const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({ ancestors = [] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.forEach((value, key) => {
    newParams.delete(key);
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {ancestors?.map(
          (ancestor, index) => (
            index > 0 && newParams.set('category', ancestor._id),
            (
              <Fragment key={ancestor._id}>
                <BreadcrumbItem id={`BreadcrumbItem-${index}`}>
                  <BreadcrumbLink href={createUrl(pathname, newParams)}>{ancestor.name}</BreadcrumbLink>
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

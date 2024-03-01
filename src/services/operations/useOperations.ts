import { useQuery } from '@tanstack/react-query';
import { Operation } from '@/server/src/entities/operations';
import { getServerUrl } from '@/utils/urls';

const requestOperations = () =>
  fetch(getServerUrl('/operations')).then((response) => response.json() as Promise<Operation[]>);

export const useOperations = () =>
  useQuery({ queryKey: ['operations'], queryFn: requestOperations });

export const useActiveOperations = () =>
  useQuery({
    queryKey: ['operations'],
    queryFn: requestOperations,
    select: (data) => data.filter((operation) => operation.status === 'executing'),
  });

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'utils/toast';
import { api } from '@/config/lib/axios';

import { WORKSTATIONS_CACHE_KEYS } from '@/features/workstations/constants/cache';
import { WORKSTATIONS_ENDPOINT } from '@/features/workstations/constants/requests';
import { Workstation } from '@/features/workstations/api/types';

type GetAllWorkstationsResponse = Array<Workstation>;

const getAllWorkstations = async () =>
  api
    .get<GetAllWorkstationsResponse>(`${WORKSTATIONS_ENDPOINT}/workstations`)
    .then((response) => response.data)
    .catch(() => {
      toast.error(
        'Não foi possível carregar os postos de trabalho. Tente novamente mais tarde!'
      );
      return [] as GetAllWorkstationsResponse;
    });

export const useGetAllWorkstations = () =>
  useQuery([WORKSTATIONS_CACHE_KEYS.allWorkstations], getAllWorkstations);

export const useGetAllWorkstationsCache = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryState<GetAllWorkstationsResponse>([
    WORKSTATIONS_CACHE_KEYS.allWorkstations,
  ]);
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import {
  PostSendMailIssueParamsOpen,
  PostSendMailIssueResponseOpen,
} from '@/features/issues/types';
import { ISSUES_CACHE_KEYS } from '@/features/issues/constants/cache';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';

function postSendMailExternIssue(data: PostSendMailIssueParamsOpen) {
  return api
    .post<PostSendMailIssueResponseOpen>(
      `${ISSUES_ENDPOINT}/issuesOpen/email`,
      data
    )
    .then((response) => response.data);
}

export function usePostSendMailExternIssue({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: (data: PostSendMailIssueResponseOpen) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(postSendMailExternIssue, {
    onSuccess(data: PostSendMailIssueResponseOpen) {
      queryClient.invalidateQueries([ISSUES_CACHE_KEYS.allIssues]);

      toast.success('E-mail enviado com sucesso!');

      onSuccessCallBack?.(data);
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar enviar o e-mail.'
      );
    },
  });
}

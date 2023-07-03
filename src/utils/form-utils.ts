import get from 'lodash/get';
import { CHAMADO_PRIORITY, CHAMADO_STATUS } from '@/constants/chamados';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSelectOptions = <T extends Record<string, any>>(
  data: T[] | undefined,
  labelKey: string,
  valueKey: string
) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return undefined;
  }

  return data.map((option) => ({
    label: get(option, labelKey),
    value: get(option, valueKey),
  })) as SelectOption[];
};

export const formValuesToPayload = (
  values: ChamadoFormValues
): ChamadoPayload => ({
  ...values,
  city_id: Number(values?.city_id?.value),
  workstation_id: Number(values?.workstation_id?.value),
  problems: values.problems.map((problem) => ({
    ...problem,
    category_id: Number(problem?.category_id?.value),
    problem_id: Number(problem?.problem_id?.[0]?.value),
    request_status: problem.request_status.value,
    priority: problem?.priority?.value,
  })),
});

export const chamadosDefaultValues: ChamadoFormValues = {
  attendant_name: '',
  applicant_name: '',
  applicant_phone: '',
  city_id: null,
  workstation_id: null,
  problems: [
    {
      request_status: {
        value: 'solved' as const,
        label: 'Resolvido',
      },
      priority: {
        value: 'normal' as const,
        label: 'Normal',
      },
      is_event: false,
      category_id: null,
      problem_id: null,
    },
  ],
};

export const maskPhoneField = (value: string) => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
};

export const ipPatternRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

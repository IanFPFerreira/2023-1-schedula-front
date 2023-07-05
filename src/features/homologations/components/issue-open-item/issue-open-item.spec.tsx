import { fireEvent, render, act } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExternIssueItem } from '.';
import { IssueOpen } from '@/features/issues/types';

const mockedExternIssue: IssueOpen = {
  id: '1',
  email: 'email@email.com',
  requester: 'Usuário Teste',
  phone: '',
  city_id: '',
  workstation_id: '',
  date: new Date().toISOString(),
  cellphone: '',
  description: '',
  alerts: [],
  dateTime: new Date(),
  problem_category: {
    id: '',
    name: '',
    description: '',
    problem_types: [],
  },
  problem_types: [],
};

const name = 'Usuário Teste';
const ExternIssuename = 'testeexternissue';
const mockedOnEditFunction = vi.fn(() => {});
const mockedOnDeleteFunction = vi.fn((userId: string) => userId);
const queryClient = new QueryClient();

describe('UserItem', () => {
  it('should display the name of the user correctly', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ExternIssueItem
            externIssue={mockedExternIssue}
            isDeleting={false}
            onDelete={mockedOnDeleteFunction}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const name_2 = await getByText(name);
    expect(name_2).toBeInTheDocument();
  });
  it('should be able to edit a ExternIssue', async () => {
    const { queryByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ExternIssueItem
            externIssue={mockedExternIssue}
            isDeleting={false}
            onDelete={mockedOnDeleteFunction}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const EditButton = await queryByLabelText(`Editar ${name}`);

    if (EditButton) {
      fireEvent.click(EditButton);
      expect(mockedOnEditFunction).toHaveBeenCalled();
    }
  });

  it('should be able to delete a ExternIssue', async () => {
    const { queryByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ExternIssueItem
            externIssue={mockedExternIssue}
            isDeleting={false}
            onDelete={mockedOnDeleteFunction}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const deleteButton = queryByLabelText('Homologação');
    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockedOnDeleteFunction).toHaveBeenCalledWith({
        ExternIssueId: mockedExternIssue.id,
      });
    }
  });
});
function getByLabelText(name: any) {
  throw new Error('Function not implemented.');
}

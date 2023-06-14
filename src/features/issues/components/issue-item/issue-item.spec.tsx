import { fireEvent, render, act } from '@testing-library/react';
import { vi } from 'vitest';
import { IssueItem } from '@/features/issues/components/issue-item';
import { Issue } from '@/features/issues/types';

const mockedIssue: Issue = {
  id: '1',
  requester: 'Mockerson',
  phone: '61988554474',
  city_id: '123',
  workstation_id: '123',
  email: 'mcok@email.com',
  date: '2021-10-10',
  problem_category: {
    id: '1',
    name: 'Category Mock',
    description: 'Category Mock',
    problem_types: [
      {
        id: '1',
        name: 'Type Mock',
      },
    ],
  },
  problem_types: [
    {
      id: '1',
      name: 'Type Mock',
    },
  ],
};

const mockedOnDeleteFunction = vi.fn((itemId: string) => itemId);

// beforeAll(() => {
//   vi.mock('@/features/issues/api/get-all-issues', () => ({
//     useGetAllIssues: vi.fn().mockReturnValue({
//       data: {
//         issues: [mockedIssue],
//       },
//     }),
//   }));
// });

describe('Issue item', () => {
  it.todo('should be able to delete a item', async () => {
    const { getByTestId } = render(
      <IssueItem
        issue={mockedIssue}
        isDeleting={false}
        onDelete={mockedOnDeleteFunction}
      />
    );

    const deleteButton = await getByTestId('delete-issue-button');
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(deleteButton).toBeInTheDocument();
    expect(mockedOnDeleteFunction).toHaveBeenCalled({
      itemId: mockedIssue.id,
    });
  });
});

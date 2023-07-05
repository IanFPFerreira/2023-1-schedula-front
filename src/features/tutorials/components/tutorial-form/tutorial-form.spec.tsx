import {
  screen,
  render,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TutorialForm } from '@/features/tutorials/components/tutorial-form';
import { Tutorial } from '@/features/tutorials/api/types';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';

const mockedTutorial: Tutorial = {
  id: '1',
  name: 'Criar ponto de rede',
  filename: 'tutorial.pdf',
  data: {
    type: 'Buffer',
    data: [1, 2, 3],
  },
  category: {
    id: '1',
    name: 'Category 1',
  },
};

describe('TutorialForm', () => {
  const queryClient = new QueryClient();

  it('should have the correct data', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <TutorialForm
                defaultValues={mockedTutorial}
                onSubmit={() => {}}
                isSubmitting={false}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Nome do tutorial')).toHaveValue(
      'Criar ponto de rede'
    );
  });

  it('renders the form with initial values', () => {
    const selectedTutorial = {
      ...mockedTutorial,
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <QueryClientProvider client={queryClient}>
              <TutorialForm
                defaultValues={selectedTutorial}
                onSubmit={() => {}}
                isSubmitting={false}
              />
            </QueryClientProvider>
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Nome do tutorial')).toHaveValue(
      'Criar ponto de rede'
    );
    expect(screen.getByLabelText('Categoria')).toBeInTheDocument();
    expect(screen.getByLabelText('Arquivo')).toBeInTheDocument();
  });
});

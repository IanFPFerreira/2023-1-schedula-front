import { useCallback, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
  Box,
  Button,
  Flex,
  Grid,
  Divider,
  Heading,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ActionButtonProps } from '../types';
import { ActionButton } from '..';
import { Input } from '@/components/form-fields/input';
import { DeleteButton } from '../delete-button';
import { IssuePayloadOpen } from '@/features/issues/types';
import { parseSelectedDatetime } from '@/utils/format-date';

interface ApproveButtonProps<Data> extends ActionButtonProps<Data> {
  handleApproveHomolog: (justify: string) => void;
  passDateTime: Date;
}

const tooltipStyle = {
  bg: 'green.500',
  color: 'white',
};

export function ApproveButton<Data>({
  label,
  onClick,
  passDateTime,
  ...props
}: ApproveButtonProps<Data>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [justification] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, register } = useForm<IssuePayloadOpen>({
    defaultValues: {
      dateTime: passDateTime ?? '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    shouldUnregister: true,
    name: 'problem_types_payload',
  });

  const handleAddDate = useCallback(() => {
    append({ label: '', value: '' });
  }, [append]);

  const handleRemoveDate = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove]
  );

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="auto">
      <PopoverAnchor>
        <ActionButton
          label={`${label}`}
          icon={<FaTrash />}
          onClick={onOpen}
          isLoading={isLoading}
          color="red.500"
          tooltipProps={tooltipStyle}
          tabIndex={0}
          {...props}
        />
      </PopoverAnchor>
      <PopoverContent
        height="200%"
        width="150%"
        left="-175%"
        data-testid="delete-confirmation-popover"
        border={0}
        borderRadius="base"
        bg="blackAlpha.600"
        backdropFilter="blur(8px)"
        color="white"
      >
        <PopoverArrow />
        <PopoverCloseButton color="white" top={2} right={2} />

        <PopoverHeader
          bg="blackAlpha.600"
          textAlign="center"
          borderTopRadius="base"
          border={0}
        >
          <Heading size="md" color="white" fontWeight="semibold">
            Confirmação
          </Heading>
        </PopoverHeader>

        <PopoverBody bg="blackAlpha.300" textAlign="center">
          <Box>
            <Controller
              control={control}
              name="dateTime"
              rules={{
                min: {
                  value: new Date().toISOString(),
                  message: 'Informe uma data no futuro.',
                },
              }}
              render={({
                field: { onChange, onBlur, ref },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    {...register('dateTime', {
                      required: 'Campo obrigatório',
                    })}
                    label="Data do Evento"
                    type="datetime-local"
                    name="dateTime"
                    id="dateTime"
                    onChange={onChange}
                    ref={ref}
                    onBlur={onBlur}
                    value={parseSelectedDatetime(String(watch('dateTime')))}
                  />
                  <Text color="red.100" mt=".5rem">
                    {error ? error.message : null}
                  </Text>
                </>
              )}
            />
          </Box>
          <Box>
            <Flex gap={4} alignItems="center" my="0.5rem">
              <Text>Alertas</Text>
            </Flex>
            <Divider mb={4} mt={1} />
            <Grid
              templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
              gap={6}
            >
              {fields?.map((field, index) => {
                return (
                  <Flex key={field.id} gap={1}>
                    <Controller
                      control={control}
                      name="alerts"
                      rules={{
                        min: {
                          value: new Date().toISOString(),
                          message: 'Informe uma data no futuro.',
                        },
                        required: 'Informe a data ou exclua o alerta',
                      }}
                      render={({
                        field: { onChange, onBlur, ref, value },
                        fieldState: { error },
                      }) => (
                        <Box w="full">
                          <Input
                            label="alert_dates"
                            type="date"
                            name={`alert_dates.${index}.date`}
                            id={`alert_dates.${index}.date`}
                            onChange={onChange}
                            min={new Date().toISOString()}
                            ref={ref}
                            onBlur={onBlur}
                            w="full"
                            value={value?.[0]?.toISOString() || ''}
                          />
                          <Text color="red.400" mt=".5rem">
                            {error ? error.message : null}
                          </Text>
                        </Box>
                      )}
                    />

                    <DeleteButton
                      label={`Alerta ${index + 1}`}
                      onClick={handleRemoveDate(index)}
                      variant="ghost"
                      alignSelf="flex-end"
                      _hover={{
                        backgroundColor: 'blackAlpha.300',
                      }}
                    />
                  </Flex>
                );
              })}
            </Grid>
            <Flex my="0.3rem">
              <ActionButton
                label="Adicionar Alerta"
                icon={<FaPlus />}
                variant="outline"
                disabled
                color="primary"
                tooltipProps={{
                  placement: 'bottom',
                }}
                onClick={handleAddDate}
              />
            </Flex>
          </Box>
        </PopoverBody>

        <PopoverFooter borderBottomRadius="base" border={0} bg="blackAlpha.300">
          <Flex justifyContent="space-between">
            <Button
              onClick={() => props.handleApproveHomolog(justification)}
              colorScheme="green"
              variant="solid"
              size="lg"
              width="100%"
              mt={8}
            >
              Aprovar Atendimento
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

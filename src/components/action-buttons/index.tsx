import { useCallback } from 'react';
import { forwardRef, IconButton, Tooltip } from '@chakra-ui/react';
import { ActionButtonProps } from './types';

function ActionButtonInner<T>(
  props: ActionButtonProps<T>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { onClick, label, icon, tooltipProps, ...rest } = props;

  const handleAction = useCallback(
    () => (onClick as () => void)?.(),
    [onClick]
  );

  return (
    <Tooltip
      label={label}
      placement="top"
      bg="blackAlpha.600"
      color="white"
      openDelay={250}
      {...tooltipProps}
    >
      <IconButton
        aria-label={label || ''}
        onClick={handleAction}
        icon={icon}
        variant="solid"
        color="gray.700"
        {...rest}
        ref={ref}
      />
    </Tooltip>
  );
}

export const ActionButton = forwardRef(ActionButtonInner) as <T>(
  props: ActionButtonProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => ReturnType<typeof ActionButtonInner>;

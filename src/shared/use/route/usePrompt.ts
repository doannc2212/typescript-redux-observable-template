import { Transition } from 'history';
import { useCallback } from 'react';
import { useBlocker } from './useBlocker';

/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message is content of title
 * @param  when is the key to open dialog
 */
export const usePrompt = (message: string, when = true): void => {
  const blocker = useCallback(
    (tx: Transition) => {
      if (window.confirm(message)) tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
};

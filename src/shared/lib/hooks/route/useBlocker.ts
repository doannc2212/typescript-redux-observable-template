import { History, Transition } from 'history';
import { useContext, useEffect } from 'react';
import { Navigator } from 'react-router';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

type ExtendNavigator = Navigator & Pick<History, 'block'>;
/**
 *
 * @param blocker is the Alert before they leave the current screen.
 * @param when is the key to open dialog
 */
export const useBlocker = (blocker: (tx: Transition) => void, when = true): void => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = (navigator as ExtendNavigator).block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry(): void {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};

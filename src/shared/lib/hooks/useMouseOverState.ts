import { useCallback, useEffect, useRef, useState } from 'react';
type TMouseOverState = {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
  isOver: boolean;
};
/**
 * use mouse over state for control a mouse over/out in a element
 */
export function useMouseOverState(): TMouseOverState {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState<boolean>(false);
  const mouseOverCallBack = useCallback(() => {
    if (!isOver) setIsOver(true);
  }, [isOver]);
  const mouseOutCallBack = useCallback(() => {
    if (isOver) setIsOver(false);
  }, [isOver]);
  useEffect(() => {
    const _targetRef = targetRef.current;
    if (!_targetRef) return;
    _targetRef.addEventListener('mouseover', mouseOverCallBack);
    _targetRef.addEventListener('mouseout', mouseOutCallBack);
    return (): void => {
      if (!_targetRef) return;
      _targetRef.removeEventListener('mouseover', mouseOverCallBack);
      _targetRef.removeEventListener('mouseout', mouseOutCallBack);
    };
  }, [mouseOutCallBack, mouseOverCallBack]);
  return {
    targetRef,
    isOver,
  };
}

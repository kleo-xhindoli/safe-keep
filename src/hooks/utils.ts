import { useMemo, DependencyList, useState, useCallback } from "react";

/**
 * Returns a computed value from some state. Value is recalculated only when the
 * deps change. Currently only wraps useMemo, the implementation may change in the
 * future.
 * @param fn function to return the computed value
 * @param deps dependencies of this computed value
 */
export function useComputed<T>(fn: () => T, deps?: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, deps);
}

export function useDisclosure(initial: boolean = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

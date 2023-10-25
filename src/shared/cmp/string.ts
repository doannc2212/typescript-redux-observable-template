export const ellipsis = (value: string, breakpoint: number = 100) =>
  `${value.substring(0, breakpoint)}${value.length > breakpoint ? '...' : ''}`;

import type { ReactNode } from 'react';

export interface CustomCarouselProps<T> {
  items: T[];
  renderItem: (item: T, isCenter: boolean) => ReactNode;
  initialIndex?: number;
}

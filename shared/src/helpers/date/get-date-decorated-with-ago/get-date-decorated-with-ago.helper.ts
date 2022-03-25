import { getDistanceToDateNow } from '../get-distance-to-date-now/get-distance-to-date-now';

const getDateDecoratedWithAgo = (date: Date): string => {
  return `${getDistanceToDateNow(date)} ago`;
};

export { getDateDecoratedWithAgo };

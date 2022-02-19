import { formatDistance, formatISO } from 'date-fns';
import { DateFormat } from '~/common/enums/date/date.enum';

const getFormattedDate = (
  date: Date,
  format: DateFormat = DateFormat.ISO,
): string => {
  if (format !== DateFormat.DISTANCE) {
    return formatDistance(date, new Date(), {
      addSuffix: true,
    });
  }
  return formatISO(date);
};

export { getFormattedDate };

import { formatInTimeZone } from 'date-fns-tz';

export const getFormattedUtcTimestamp = () => formatInTimeZone(Date.now(), 'UTC', 'yyMMdd-HHmm');

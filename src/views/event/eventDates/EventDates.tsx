import './EventDates.scss';
import { parseToDateTime } from '../../../utils/datetimeParser';
import LuxonHelper from '../../../utils/LuxonHelper';
import React from 'react';

interface EventDatesProps {
  event: any;
  isSmall: boolean;
}

export const EventDates = (props: EventDatesProps) => {
  const { event, isSmall } = props;
  const { startAt, endAt, timezoneStartAt } = event;

  const isSameDay: boolean = LuxonHelper.isSameDay(startAt, endAt);

  const dateFromString: string = parseToDateTime(
    startAt,
    timezoneStartAt
  ).toFormat(`d LLL ${isSameDay ? 'yyyy' : ''}`);
  const dateToString: string = !isSameDay
    ? ` - ${parseToDateTime(endAt, timezoneStartAt).toFormat('d LLL yyyy')}`
    : '';
  const dates = `${dateFromString}${dateToString}`;

  const timeFrom: string = parseToDateTime(startAt, timezoneStartAt).toFormat(
    'HH:mm'
  );
  const timeTo: string = parseToDateTime(endAt, timezoneStartAt).toFormat(
    'HH:mm'
  );
  const time = `${timeFrom}${timeTo}`;

  return (
    <div
      className={isSmall ? 'search-item__container' : 'event-dates__container'}
    >
      <p className={isSmall ? 'search-item__text' : 'event-dates__text-date'}>
        {dates}
      </p>
      <p className={isSmall ? 'search-item__text' : 'event-dates__text-hour'}>
        {time}
      </p>
    </div>
  );
};

export default EventDates;

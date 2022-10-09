import ICalParser from 'ical-js-parser';

import { DateTime } from 'luxon';
import { forEach, map } from 'lodash';
import { formatAppAlarm } from './common';
import { getKnownProps } from './ICalHelper';
import { v4 } from 'uuid';
import LuxonHelper from './LuxonHelper';

export type CalendarMethod = 'REQUEST' | 'REPLY';
export const CALENDAR_REQUEST_METHOD: CalendarMethod = 'REQUEST';
export const CALENDAR_REPLY_METHOD: CalendarMethod = 'REPLY';

interface ICalHelperEvent {
  dtstart: any;
  dtend: any;
  dtstamp?: string;
  organizer?: any;
  uid?: string;
  attendee?: any;
  created?: string;
  description?: string;
  lastModified?: string;
  location?: string;
  sequence?: string;
  color?: string;
  status?: string;
  summary?: string;
  transp?: string;
  rrule?: string;
  props?: any;
  recurrenceID?: any;
  [key: string]: any;
}

class ICalHelperV2 {
  events: ICalHelperEvent[] = [];

  constructor(data: any[]) {
    forEach(data, (event) => {
      const {
        externalID,
        createdAt,
        updatedAt,
        startAt,
        endAt,
        summary,
        color,
        description,
        location,
        rRule,
        timezoneStartAt,
        organizer,
        attendees,
        props,
        allDay,
        alarms,
        recurrenceID,
        sequence,
      } = event;

      const result: any = {};

      result.dtstart = {
        value: allDay
          ? DateTime.fromISO(startAt).toFormat('yyyyMMdd')
          : LuxonHelper.toUtcString(startAt),
        timezone: allDay ? undefined : timezoneStartAt,
      };
      result.dtend = {
        value: allDay
          ? DateTime.fromISO(endAt).plus({ day: 1 }).toFormat('yyyyMMdd')
          : LuxonHelper.toUtcString(endAt),
        timezone: allDay ? undefined : timezoneStartAt,
      };
      result.uid = externalID ? externalID : v4();
      if (attendees?.length) {
        result.organizer = organizer || props?.organizer;
        result.attendee = attendees;
      }

      result.created = LuxonHelper.toUtcString(createdAt);
      result.dtstamp = DateTime.local().toUTC().toString();
      result.description = description;
      result.lastModified = LuxonHelper.toUtcString(updatedAt);
      result.rrule =
        rRule && rRule !== ''
          ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
            rRule
          : undefined;
      result.summary = summary;
      result.location = location;
      // this.sequence = sequence;
      result.status = 'CONFIRMED';
      result.transp = 'OPAQUE';

      if (color) {
        result.color = color;
      }

      if (recurrenceID) {
        result.recurrenceId = {
          value: recurrenceID,
          timezone: allDay ? undefined : timezoneStartAt,
        };
      }

      // include all other not supported properties
      if (props) {
        forEach(Object.entries(props), (propItem) => {
          if (propItem[0] === 'sequence') {
            if (sequence) {
              result.sequence = String(Number(propItem[1]));
            } else {
              result[propItem[0]] = String(Number(propItem[1]) + 1);
            }
          } else {
            if (propItem[0] === 'alarms' && alarms?.length === 0) {
              result.alarms = propItem[1];
            } else if (propItem[0] !== 'attendee') {
              result[propItem[0]] = propItem[1];
            }
          }
        });
      }

      // format alarms
      if (alarms?.length) {
        result.alarms = map(alarms, formatAppAlarm);
      }

      if (!result.sequence) {
        result.sequence = '0';
      }

      this.events.push(result);
    });
  }

  private createCalendar = (method?: CalendarMethod) => {
    if (method) {
      return {
        begin: 'BEGIN:VCALENDAR',
        prodid: 'Bloben 1.0',
        method: method,
        calscale: 'GREGORIAN',
        version: '2.0',
        end: 'END:VCALENDAR',
      };
    } else {
      return {
        begin: 'BEGIN:VCALENDAR',
        prodid: 'Bloben 1.0',
        // method: 'REQUEST',
        calscale: 'GREGORIAN',
        version: '2.0',
        end: 'END:VCALENDAR',
      };
    }
  };

  public parseTo = (method?: CalendarMethod) => {
    const template = {
      calendar: this.createCalendar(method),
      events: map(this.events, (event) => getKnownProps(event)),
    };

    return ICalParser.toString(template);
  };
}

export default ICalHelperV2;

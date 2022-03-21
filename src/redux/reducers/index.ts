import { Reducer, combineReducers } from 'redux';

import { ReduxState } from '../../types/interface';
import baseDateRange, { initBaseDateRange } from './baseDateRange';
import cachedEvents from './cachedEvents';
import calDavAccounts from 'redux/reducers/calDavAccounts';
import calDavCalendars from './calDavCalendars';
import calDavEvents from './calDavEvents';
import calendarDaysRange from './calendarDays';
import settings, { initSettings } from './settings';
import syncLog from './syncLog';
import user from './user';
import webcalCalendars from './webcalCalendars';

export const initialReduxState: ReduxState = {
  calDavAccounts: [],
  calDavCalendars: [],
  calDavEvents: [],
  calendarDaysRange: { rangeFrom: 'INIT', rangeTo: '', direction: 'today' },
  baseDateRange: initBaseDateRange(),
  cachedEvents: [],
  settings: initSettings(),
  webcalCalendars: [],
  syncLog: {
    events: new Date().toISOString(),
  },
  user: {
    username: '',
    id: '',
  },
};

export const allReducers: Reducer = combineReducers({
  calDavAccounts,
  calDavCalendars,
  calDavEvents,
  calendarDaysRange,
  baseDateRange,
  settings,
  webcalCalendars,
  cachedEvents,
  syncLog,
  user,
});

const rootReducer = (state: ReduxState | undefined, action: any) => {
  if (action.type === 'REPLACE') {
    state = action.payload;
  }

  return allReducers(state, action);
};
export default rootReducer;

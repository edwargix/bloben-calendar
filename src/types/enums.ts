export enum REMINDER_TYPE {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

export enum APP_PATH {
  HOME = '/calendar',
  SETTINGS = '/calendar/settings',
}

export enum ROLE {
  USER = 'USER',
  DEMO = 'DEMO',
}

export enum WEBSOCKET_TRANSPORT {
  POLLING = 'polling',
  WEBSOCKET = 'websocket',
}

// common classes
export enum CSS_CLASSES {
  BOTTOM_SHEET_BACKDROP = 'bottom-sheet__backdrop',
  BOTTOM_SHEET_CONTAINER = 'bottom-sheet__container',
}

export enum EVENT_TYPE {
  NORMAL = 'normal',
  MONTH = 'month',
  AGENDA = 'agenda',
  HEADER = 'header',
}

export enum CALENDAR_VIEW {
  AGENDA = 'agenda',
  WEEK = 'week',
  DAY = 'day',
  THREE_DAYS = 'three_days',
  MONTH = 'month',
}

export enum SYNC_STATUS {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  INSERT = 'INSERT',
  DELETE = 'DELETE',
}

export enum ALARM_DURATION {
  DAY = 'days',
  SECOND = 'seconds',
  MINUTE = 'minutes',
  HOUR = 'hours',
  WEEK = 'weeks',
}

export enum SETTINGS_PATHS {
  GENERAL = 'GENERAL',
  ACCOUNTS = 'ACCOUNTS',
  CALENDARS = 'CALENDARS',
  EMAIL_CONFIG = 'EMAIL_CONFIG',
  RESET = 'RESET',
  HELP = 'HELP',
  ABOUT = 'ABOUT',
  ACKNOWLEDGMENTS = 'ACKNOWLEDGMENTS',
  SHARED_CALENDARS = 'SHARED_CALENDARS',
  CONTACTS = 'CONTACTS',
}

export enum SYNC_TYPE {
  CALDAV_ACCOUNT = 'CALDAV_ACCOUNT',
  CALDAV_CALENDAR = 'CALDAV_CALENDAR',
  CALDAV_EVENT = 'CALDAV_EVENT',
  TO_SYNC = 'TO_SYNC',
}

export enum COLORS {
  PRIMARY = 'indigo',
}
export enum TOAST_STATUS {
  ERROR = 'error',
}
export enum TOAST_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum CALDAV_OBJ_TYPE {
  EVENT = 'EVENT',
}

export enum DRAWER_PATH {
  CALENDAR = 'CALENDAR',
}

export enum ACCOUNT_TYPE {
  CAL_DAV = 'CAL_DAV',
  WEBCAL = 'WEBCAL',
}

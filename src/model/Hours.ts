enum DayOfWeek {
  SUN = "sun",
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat"
}

enum DayOfWeekFull {
  SUN = "sunday",
  MON = "monday",
  TUE = "tuesday",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday"
}

enum DayOfWeekFullCapital {
  SUN = "Sunday",
  MON = "Monday",
  TUE = "Tuesday",
  WED = "Wednesday",
  THU = "Thursday",
  FRI = "Friday",
  SAT = "Saturday"
}

export type HoursObject = {
  start: string | null;
  end: string | null;
  day_of_week: string | null;
  open: boolean;
}

export class Hours {
  start: string | null;
  end: string | null;
  dayofweek: DayOfWeek | null;
  open: boolean = true;

  constructor(hours: Partial<HoursObject>) {
    this.open = hours?.open ? hours.open : false;
    this.dayofweek = this.getDayofweek(hours?.day_of_week);
    this.start = hours?.start ? hours.start : null;
    this.end = hours?.end ? hours.end : null;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  getDayofweek(dayofweek: string | null | undefined): DayOfWeek | null {
    if (!dayofweek) return null;

    if (dayofweek === 'sun') return DayOfWeek.SUN;
    if (dayofweek === 'mon') return DayOfWeek.MON;
    if (dayofweek === 'tue') return DayOfWeek.TUE;
    if (dayofweek === 'wed') return DayOfWeek.WED;
    if (dayofweek === 'thu') return DayOfWeek.THU;
    if (dayofweek === 'fri') return DayOfWeek.FRI;
    if (dayofweek === 'sat') return DayOfWeek.SAT;

    return null;
  }

  setDayofweek(dayofweek: DayOfWeek) {
    this.dayofweek = dayofweek;
  }

  setStart(start: string) {
    this.start = start;
  }

  setEnd(end: string) {
    this.end = end;
  }
}

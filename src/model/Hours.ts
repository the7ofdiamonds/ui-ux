export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export class Hours {
  start: string | null;
  end: string | null;
  dayofweek: DayOfWeek;
  open: boolean;

  constructor(
    open: boolean,
    dayofweek: DayOfWeek,
    start: string | null = null,
    end: string | null = null
  ) {
    this.open = open;
    this.dayofweek = dayofweek;
    this.start = start;
    this.end = end;
  }

  setOpen(open: boolean) {
    this.open = open;
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

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

export type HoursObject = {
  start: string | null;
  end: string | null;
  day_of_week: string | null;
  open: boolean;
}

export class Hours {
  start: string | null;
  end: string | null;
  dayofweek: DayOfWeekFull | null;
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

  getDayofweek(dayofweek: string | null | undefined): DayOfWeekFull | null {
    if (!dayofweek) return null;

    if (dayofweek === DayOfWeek.SUN.toString() || dayofweek === DayOfWeekFull.SUN.toString()) return DayOfWeekFull.SUN;
    if (dayofweek === DayOfWeek.MON.toString() || dayofweek === DayOfWeekFull.MON.toString()) return DayOfWeekFull.MON;
    if (dayofweek === DayOfWeek.TUE.toString() || dayofweek === DayOfWeekFull.TUE.toString()) return DayOfWeekFull.TUE;
    if (dayofweek === DayOfWeek.WED.toString() || dayofweek === DayOfWeekFull.WED.toString()) return DayOfWeekFull.WED;
    if (dayofweek === DayOfWeek.THU.toString() || dayofweek === DayOfWeekFull.THU.toString()) return DayOfWeekFull.THU;
    if (dayofweek === DayOfWeek.FRI.toString() || dayofweek === DayOfWeekFull.FRI.toString()) return DayOfWeekFull.FRI;
    if (dayofweek === DayOfWeek.SAT.toString() || dayofweek === DayOfWeekFull.SAT.toString()) return DayOfWeekFull.SAT;

    return null;
  }

  // setDayofweek(dayofweek: DayOfWeek) {
  //   this.dayofweek = dayofweek;
  // }

  setStart(start: string) {
    this.start = start;
  }

  setEnd(end: string) {
    this.end = end;
  }

  toHoursObject(): HoursObject {
    return {
      start: this.start,
      end: this.end,
      day_of_week: this.dayofweek ? this.dayofweek.toString() : null,
      open: this.open ? this.open : false
    }
  }
}

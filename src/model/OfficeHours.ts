import type { HoursObject } from "./Hours";
import { Hours } from "./Hours";

export type OfficeHoursObject = {
    sun: HoursObject | null;
    mon: HoursObject | null;
    tue: HoursObject | null;
    wed: HoursObject | null;
    thu: HoursObject | null;
    fri: HoursObject | null;
    sat: HoursObject | null;
}

export class OfficeHours {
    sun: Hours | null;
    mon: Hours | null;
    tue: Hours | null;
    wed: Hours | null;
    thu: Hours | null;
    fri: Hours | null;
    sat: Hours | null;

    constructor(availability: OfficeHoursObject) {
        this.sun = availability.sun ? new Hours(availability.sun) : new Hours({ "open": false });
        this.mon = availability.mon ? new Hours(availability.mon) : new Hours({ "open": false });
        this.tue = availability.tue ? new Hours(availability.tue) : new Hours({ "open": false });
        this.wed = availability.wed ? new Hours(availability.wed) : new Hours({ "open": false });
        this.thu = availability.thu ? new Hours(availability.thu) : new Hours({ "open": false });
        this.fri = availability.fri ? new Hours(availability.fri) : new Hours({ "open": false });
        this.sat = availability.sat ? new Hours(availability.sat) : new Hours({ "open": false });
    }

    toOfficeHoursObject(): OfficeHoursObject {
        return {
            "sun": this.sun ? this.sun.toHoursObject() : null,
            "mon": this.mon ? this.mon.toHoursObject() : null,
            "tue": this.tue ? this.tue.toHoursObject() : null,
            "wed": this.wed ? this.wed.toHoursObject() : null,
            "thu": this.thu ? this.thu.toHoursObject() : null,
            "fri": this.fri ? this.fri.toHoursObject() : null,
            "sat": this.sat ? this.sat.toHoursObject() : null
        }
    }
}
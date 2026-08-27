import type { HoursObject } from "./Hours";
import { Hours } from "./Hours";

export class OfficeHours {
    sun: Hours;
    mon: Hours;
    tue: Hours;
    wed: Hours;
    thu: Hours;
    fri: Hours;
    sat: Hours;

    constructor(availability: Array<HoursObject>) {
        this.sun = availability[0].day_of_week === 'sun' ? new Hours(availability[0]) : new Hours({ "open": false });
        this.mon = availability[1].day_of_week === 'mon' ? new Hours(availability[1]) : new Hours({ "open": false });
        this.tue = availability[2].day_of_week === 'tue' ? new Hours(availability[2]) : new Hours({ "open": false });
        this.wed = availability[3].day_of_week === 'wed' ? new Hours(availability[3]) : new Hours({ "open": false });
        this.thu = availability[4].day_of_week === 'thu' ? new Hours(availability[4]) : new Hours({ "open": false });
        this.fri = availability[5].day_of_week === 'fri' ? new Hours(availability[5]) : new Hours({ "open": false });
        this.sat = availability[6].day_of_week === 'sat' ? new Hours(availability[6]) : new Hours({ "open": false });
    }
}
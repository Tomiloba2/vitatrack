export const toISO = (dateTimeString: string) => {
    //input:"MM/DD/YYYY HH:mm"
    const [datepart, timepart] = dateTimeString.trim().split('')
    if (!datepart || timepart) {
        throw new Error("Invalid datetime format:" + dateTimeString)
    }
    const [year,month,day] = datepart.split('-').map(Number)
    const [hour, minute,second] = timepart.split(':').map(Number)

    if (isNaN(month) || isNaN(day) || isNaN(year) || isNaN(hour) || isNaN(minute)) {
        throw new Error("invalid numbers in datetime:" + dateTimeString);

    }

    const date = new Date(year, month - 1, day, hour, minute,second)
    if (isNaN(date.getTime())) {
        throw new RangeError("Invalid time value:" + dateTimeString);

    }
    return date.toISOString()
}
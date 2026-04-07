import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { timeStringToSeconds } from "./timeStringToSeconds";
import { formatTimezToTime } from "./formatTimezToTime";

dayjs.extend(duration)

export function diffTimeZToTimeString(startTime: string, endTime: string) {
    const startSeconds = timeStringToSeconds(formatTimezToTime(startTime))
    const endSeconds = timeStringToSeconds(formatTimezToTime(endTime))
    const diff = endSeconds - startSeconds

    return dayjs
        .duration(diff, "seconds")
        .format("HH:mm:ss")
}
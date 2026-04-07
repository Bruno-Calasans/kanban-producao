import { formatTimezToTime } from "./formatTimezToTime"
import { timeStringToSeconds } from "./timeStringToSeconds"

export function timeStringToTimeObj(time: string) {
    const timeStr = formatTimezToTime(time)
    const totalSeconds = timeStringToSeconds(timeStr)

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return { hours, minutes, seconds }
}
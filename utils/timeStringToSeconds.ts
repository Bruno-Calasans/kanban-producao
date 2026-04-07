export function timeStringToSeconds(time: string) {
    const [h, m, s] = time.split(":")
    const hour = Number(h) * 60 * 60
    const min = Number(m) * 60
    const seconds = Number(s)
    return hour + min + seconds
}
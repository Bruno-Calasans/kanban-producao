export function formatTimezToTime(time: string) {
    const [h, m, s] = time.replace(/([+-]\d{2}(:?\d{2})?)$/, "").split(":")
    return `${h}:${m}:${s}`
}
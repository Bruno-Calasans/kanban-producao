export default function stringDateTimeToDate(value: string | Date | unknown) {
    const date = new Date(value as string)
    return date.toLocaleDateString()
}

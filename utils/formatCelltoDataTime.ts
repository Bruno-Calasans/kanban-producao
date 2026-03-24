export default function formatDateTimeCellValue(value: string | Date | unknown) {
    const date = new Date(value as string)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

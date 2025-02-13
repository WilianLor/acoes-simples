export const dateHourFormater = (dateISO: string) => {
    const fullDate = dateISO.split('T')
    const date = fullDate[0].split('-')
    const time = fullDate[1].split(':')

    return `${date[2]}/${date[1]}/${date[0]} ${time[0]}:${time[1]}`
}
export const dateHourInvertFormater = (dateISO: string) => {
    const fullDate = dateISO.split('T')
    const date = fullDate[0].split('-')
    const time = fullDate[1].split(':')

    return `${time[0]}:${time[1]} ${date[2]}/${date[1]}/${date[0]}`
}
export const dateFormater = (dateISO: string) => {
    const date = dateISO.split('T')[0].split('-')

    return `${date[2]}/${date[1]}/${date[0]}`
}

export const formatPhone = (phone: string) => `${phone.slice(0, phone.length - 4)}-${phone.slice(phone.length - 4, phone.length)}`
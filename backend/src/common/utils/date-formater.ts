export const dateHourFormater = (dateISO: string) => {

    const fullDate = dateISO.split('T')
    const date = fullDate[0].split('-')
    const time = fullDate[1].split(':')
    return `${date[2]}/${date[1]}/${date[0]} ${time[0]}:${time[1]}`
    // .replaceAll('-', '/').replace('T', ' ').split('.')[0].slice(0, 16)
}
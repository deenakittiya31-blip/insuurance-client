import moment from 'moment/min/moment-with-locales'

export const dateFormat = (date) => {
    return moment(date).locale('th').format('lll')
}

export const dateFormatNoTime = (date) => {
    return moment(date).locale('th').format('l')
}
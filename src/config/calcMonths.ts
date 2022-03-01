export function calcMonts() {
    const months = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    const presentDate = new Date();
    const newMonths: string[] = []
    newMonths.push(months[presentDate.getMonth()])
    for (let index = 1; index < 12; index++) {

        newMonths.push(months[(presentDate.getMonth() + index) != 12 ? (presentDate.getMonth() + index) : 0])
    }

    return newMonths

}
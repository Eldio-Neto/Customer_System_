function validateAndFormatNumber(numberS: string | number): string {
    const str = numberS.toString();
    const regex = /^[0-9]*,?[0-9]*$/;

    if (!regex.test(str)) {
        return '';
    }

    const number = parseFloat(str.replace(',', '.'));
    return number.toFixed(2).replace('.', ',');
}

export default validateAndFormatNumber;
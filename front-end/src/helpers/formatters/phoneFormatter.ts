function formatPhoneNumber(phoneNumber: string): string {
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    cleaned = cleaned.substring(0, 11);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    if(containsLetters(phoneNumber)){
        return cleaned;
    }
    return phoneNumber;
   
}
function containsLetters(str: string): boolean {
    return /[a-zA-Z]/.test(str);
}
export default formatPhoneNumber;
function validatePhoneNumber(phoneNumber: string): boolean {
    const regex = /^[0-9()-\s]+$/;
    const cleaned = phoneNumber.replace(/[()-\s]/g, '');
    return regex.test(phoneNumber) && cleaned.length === 11;
}

export default validatePhoneNumber;
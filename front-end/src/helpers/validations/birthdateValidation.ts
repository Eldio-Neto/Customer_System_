function validateBirthdate(birthdate: string): boolean {
    const birthdateDate = new Date(birthdate);
    const currentDate = new Date();
    // Set the hours, minutes, seconds and milliseconds to 0 for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    return birthdateDate <= currentDate;
}

export default validateBirthdate;
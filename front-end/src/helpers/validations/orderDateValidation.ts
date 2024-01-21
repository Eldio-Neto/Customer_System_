function validateOrderDate(date: string): boolean {
    const [year, month, day] = date.split('-').map(Number);
    const dateV = new Date(year, month - 1, day); 
    dateV.setHours(0, 0, 0, 0);
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return dateV >= currentDate;
}

export default validateOrderDate;
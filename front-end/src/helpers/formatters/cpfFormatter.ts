function formatCPF(cpf: string): string {
    const cleaned = ('' + cpf).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
        return match[1] + '.' + match[2] + '.' + match[3] + '-' + match[4];
    }

    if(containsLetters(cpf)){
        return cleaned;
    }
    return cpf;
}

function containsLetters(str: string): boolean {
    return /[a-zA-Z]/.test(str);
}

export default formatCPF;
export default function calculateAge(dateOfBirth: string): number {
    const now = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDifference = now.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
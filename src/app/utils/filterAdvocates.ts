import { Advocate } from "../types/advocate";

export const filterAdvocates = (advocates: Advocate[], searchTerm: string) => {
    if (searchTerm === '') {
        return advocates;
    }

    const _searchTerm = searchTerm.toLowerCase()

    return advocates.filter((advocate) => (
        advocate.firstName.toLowerCase().includes(_searchTerm) ||
        advocate.lastName.toLowerCase().includes(_searchTerm) ||
        advocate.city.toLowerCase().includes(_searchTerm) ||
        advocate.degree.toLowerCase().includes(_searchTerm) ||
        advocate.specialties.some(specialty => specialty.toLowerCase().includes(_searchTerm)) ||
        JSON.stringify(advocate.yearsOfExperience).includes(_searchTerm)
    ))
}
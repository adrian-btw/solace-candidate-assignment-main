import { Advocate } from "../types/advocate"
import { AdvocateSpecialtiesCell } from "./AdvocateSpecialtiesCell"
import { Badge } from "./common/Badge"

export interface AdvocateRowProps {
    advocate: Advocate
}

export const AdvocateRow = ({ advocate }: AdvocateRowProps) => {
    return (
        <>
            <td>{advocate.firstName}</td>
            <td>{advocate.lastName}</td>
            <td>{advocate.city}</td>
            <td>{advocate.degree}</td>
            <td><AdvocateSpecialtiesCell specialties={advocate.specialties} maxDisplayed={5} /></td>
            <td>{advocate.yearsOfExperience}</td>
            <td>{advocate.phoneNumber}</td>
        </>
    )
}
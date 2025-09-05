import { Advocate } from "../types/advocate"
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
            <td className="flex flex-wrap gap-2">
                {advocate.specialties.map((s, i) => (
                    <Badge key={i} content={s} />
                ))}
            </td>
            <td>{advocate.yearsOfExperience}</td>
            <td>{advocate.phoneNumber}</td></>
    )
}
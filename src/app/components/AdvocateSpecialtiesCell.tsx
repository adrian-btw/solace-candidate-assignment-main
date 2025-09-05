import { Badge } from "./common/Badge"

export interface AdvocateSpecialtiesCellProps {
    specialties: string[];
    maxDisplayed?: number;
}

export const AdvocateSpecialtiesCell = ({ specialties, maxDisplayed }: AdvocateSpecialtiesCellProps) => {
    const dedupedSpecialties = Array.from(new Set(specialties))

    const numSpecialties = dedupedSpecialties.length;
    if (maxDisplayed !== undefined && maxDisplayed < numSpecialties) {
        return <div className="flex flex-wrap gap-2">
            {dedupedSpecialties.slice(0, maxDisplayed).map((s, i) => (
                <Badge key={i} content={s} truncate />
            ))}
            <Badge content={`+ ${numSpecialties - maxDisplayed} more`} />
        </div>
    }

    return <div className="flex flex-wrap gap-2">
        {specialties.map((s, i) => (
            <Badge key={i} content={s} truncate />
        ))}
    </div>
}
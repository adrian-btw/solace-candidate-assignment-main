export interface BadgeProps {
    content: string;
    truncate?: boolean;
}

export const Badge = ({ content, truncate = false }: BadgeProps) => {
    return <span className={`rounded-full bg-gray-200 px-3 py-1 text-xs${truncate ? ' truncate max-w-xs' : ''}`}>{content}</span>
}

export interface BadgeProps {
    content: string;
}

export const Badge = ({ content }: BadgeProps) => {
    return <span className="rounded-full bg-gray-200 px-3 py-1">{content}</span>
}
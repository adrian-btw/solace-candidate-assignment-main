export interface PhoneNumberProps {
  number: string | number;
  className?: string;
}

export const PhoneNumber = ({ number, className = "" }: PhoneNumberProps) => {
  const raw = String(number);
  const digits = raw.replace(/\D/g, "");

  const formatted =
    digits.length === 10
      ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
      : raw;

  return <span className={className}>{formatted}</span>;
};


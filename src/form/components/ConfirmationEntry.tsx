export const ConfirmationEntry = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="row">
      <div className="column label">{label}:</div>
      <div className="column value">{value}</div>
    </div>
  );
};

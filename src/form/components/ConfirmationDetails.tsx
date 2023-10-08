import { personalFields, destinationFields, guestFields } from "../forms";
import { FIELD_TYPES } from "../constants";
import { formatDate } from "../utils";
import { ConfirmationEntry } from "./ConfirmationEntry";

export const Confirmation = ({ data }: any) => {
  const allFormFields = [
    ...personalFields,
    ...destinationFields,
    ...guestFields,
  ];

  return (
    <div className="column">
      {Object.keys(data).map((entry: any) => {
        const field = allFormFields.find((field) => field.id === entry);
        if (field) {
          if (field.type === FIELD_TYPES.CHECKBOX) {
            return (
              <ConfirmationEntry
                label={field.label}
                value={data[entry] ? "Yes" : "No"}
              />
            );
          } else {
            return (
              <ConfirmationEntry label={field.label} value={data[entry]} />
            );
          }
        } else {
          if (entry === "startDate") {
            const startDate = formatDate(data[entry]);
            return <ConfirmationEntry label="Start Date:" value={startDate} />;
          }

          if (entry === "endDate") {
            const endDate = formatDate(data[entry]);
            return <ConfirmationEntry label="End Date:" value={endDate} />;
          }
          return null
        }
      })}
    </div>
  );
};

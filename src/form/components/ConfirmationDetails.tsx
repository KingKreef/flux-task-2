import { personalFields, destinationFields, guestFields } from "../forms";
import { FIELD_TYPES } from "../constants";
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
                <div className="row">
                  <div className="column label">{field.label}:</div>
                  <div className="column value">{data[entry] ? "Yes" : "No"}</div>
                </div>
              );
            } else {
              return (
                <div className="row">
                  <div className="column label">{field.label}:</div>
                  <div className="column value">{data[entry]}</div>
                </div>
              );
            }
          }
        })}
      </div>
    );
  };
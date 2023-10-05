import { FIELD_TYPES } from "./constants";
import { DateRangePicker } from "./components/DateRangePicker";
/**
 * Builds the form according to the input object
 * This function allows scalability and maintainability for forms
 * Can be reused for any form on the website so means no duplicate code
 * Better for debugging because all form logic is in one place
 *
 * @param {Object} fields - object containing the field details
 * @param {function} handleChange - set the form data state
 * @param {Object} values - all current field values
 * @param {Object[]} errors - array of all current errors
 * @returns - inputs with labels
 */
export const FormBuilder = ({ fields, handleChange, values, errors }: any) => {
    return (
      <>
        {fields.map((field: any) => {
          const errorMsg = errors.find((err: any) => err.field === field.id);
  
          switch (field.type) {
            case FIELD_TYPES.TEXT:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    className="input-field"
                    type={FIELD_TYPES.TEXT}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.id] || ""}
                  />
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            case FIELD_TYPES.EMAIL:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    className="input-field"
                    type={FIELD_TYPES.TEXT}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.id] || ""}
                  />
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            case FIELD_TYPES.TEL:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    className="input-field"
                    type={FIELD_TYPES.TEL}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.id] || ""}
                  />
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            case FIELD_TYPES.TEXT_AREA:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <textarea
                    className="input-field"
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.id] || ""}
                  />
                </div>
              );
            case FIELD_TYPES.CHECKBOX:
              return (
                <div className="checkbox-container">
                  <input
                    className="checkbox-input"
                    type={FIELD_TYPES.CHECKBOX}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    checked={values[field.id] || false}
                    style={{ justifyContent: "left" }}
                  />
                  <label htmlFor={field.id} className="checkbox-label">
                    {field.label}
                  </label>
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            case FIELD_TYPES.SELECT:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <select
                    id={field.id}
                    value={values[field.id] || ""}
                    onChange={handleChange}
                    name={field.name}
                    className="input-field"
                  >
                    <option value="">Please select</option>
                    {field.options.map(
                      (option: { value: string; text: string }) => (
                        <option value={option.value}>{option.text}</option>
                      )
                    )}
                  </select>
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            case FIELD_TYPES.DATE_RANGE:
              return (
                <div className="field">
                  <DateRangePicker
                    handleChange={handleChange}
                    startDate={values.startDate}
                    endDate={values.endDate}
                  />
                </div>
              );
            case FIELD_TYPES.NUMBER:
              return (
                <div className="field">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    className="input-field"
                    type={FIELD_TYPES.NUMBER}
                    id={field.id}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.id] || ""}
                  />
                  {errorMsg?.text && (
                    <div style={{ fontSize: "12px", color: "red" }}>
                      {errorMsg.text}
                    </div>
                  )}
                </div>
              );
            default:
              return <div>No field</div>;
          }
        })}
      </>
    );
  };
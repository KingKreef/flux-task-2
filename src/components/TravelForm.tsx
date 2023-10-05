import React, { useState } from "react";
import "./TravelForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TravelForm = () => {
  const [formData, setFormData] = useState({ children: 0, adults: 1 });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  /**
   * Handles the state change for the form data
   *
   * @param {event} e - input value
   */
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  /**
   * Handle the form submission. We can add whatever is needed here. For example:
   * 1. Confirmation email
   * 2. Admin email
   * 3. Newsletter subscription
   * 4. Database entry
   * 5. Zapier webhook
   * 6. Booking email
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("sadsad");
    // Handle form submission here
  };

  /**
   * Go to next form and validates input values
   *
   * @param {Object} data - input values submitted by user
   * @param {Object} form - the form fields to check against
   */
  const handleNext = (data: any, form: any) => {
    const err = validate(data, form);
    if (err.length) {
      setErrors(err);
    } else {
      setErrors([]);
      setStep(step + 1);
    }
  };

  /**
   * Go to the previous form and clear the errors
   */
  const handleBack = () => {
    setErrors([]);
    setStep(step - 1);
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit}>
        {getStepComponent(
          step,
          handleChange,
          formData,
          handleNext,
          handleBack,
          errors
        )}
      </form>
    </div>
  );
};

/**
 * Validates user inputs
 *
 * @param {any} data - input values submitted by user
 * @param {any} form - the form fields to check against
 * @returns {errors} - array of errors
 */
const validate = (data: any, form: any) => {
  const errors: any = [];
  form.forEach((field: any) => {
    const { id, required, label, type } = field;
    const submitFieldData = data[id];
    if (required && !submitFieldData) {
      errors.push({ field: id, text: `${label} is required` });
    }

    if (!errors.length) {
      if (type === FIELD_TYPES.EMAIL) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isValidEmail = emailRegex.test(submitFieldData);
        if (!isValidEmail) {
          errors.push({ field: id, text: "Invalid email address" });
        }
      }

      if (type === FIELD_TYPES.TEL) {
        const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        const isValidPhone = phoneRegex.test(submitFieldData);
        if (!isValidPhone) {
          errors.push({ field: id, text: "Invalid phone number" });
        }
      }
    }
  });

  return errors;
};

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
const FormBuilder = ({ fields, handleChange, values, errors }: any) => {
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

/**
 *  Constants of input types
 */
const FIELD_TYPES = {
  TEXT: "text",
  TEL: "tel",
  EMAIL: "email",
  CHECKBOX: "checkbox",
  TEXT_AREA: "textArea",
  SELECT: "select",
  DATE_RANGE: "dateRange",
  NUMBER: "number",
};

/**
 *  User details form fields
 */
const personalFields: any = [
  {
    label: "First Name",
    id: "firstName",
    name: "firstName",
    type: FIELD_TYPES.TEXT,
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    name: "lastName",
    type: FIELD_TYPES.TEXT,
    required: true,
  },
  {
    label: "Email",
    id: "email",
    name: "email",
    type: FIELD_TYPES.EMAIL,
    required: true,
  },
  {
    label: "Contact Number",
    id: "contactNumber",
    name: "contactNumber",
    type: FIELD_TYPES.TEL,
    required: true,
  },
  {
    label: "Message",
    id: "message",
    name: "message",
    type: FIELD_TYPES.TEXT_AREA,
  },
  {
    label: "I consent to save my data",
    id: "consent",
    name: "consent",
    type: FIELD_TYPES.CHECKBOX,
    required: true,
  },
  {
    label: "Subscribe to Newsletter",
    id: "subscribe",
    name: "subscribe",
    type: FIELD_TYPES.CHECKBOX,
  },
];

/**
 *  Destination details form fields
 */
const destinationFields: any = [
  {
    label: "Destination",
    id: "destination",
    name: "destination",
    type: FIELD_TYPES.SELECT,
    options: [
      { value: "option1", text: "Option 1" },
      { value: "option2", text: "Option 2" },
      { value: "option3", text: "Option 3" },
    ],
    required: true,
  },
  {
    label: "Dates",
    id: "dates",
    name: "dates",
    type: FIELD_TYPES.DATE_RANGE,
  },
];

/**
 *  Guest details form fields
 */
const guestFields: any = [
  {
    label: "Number of adults",
    id: "adults",
    name: "adults",
    type: FIELD_TYPES.NUMBER,
    required: true,
  },
  {
    label: "Number of children",
    id: "children",
    name: "children",
    type: FIELD_TYPES.NUMBER,
  },
];

/**
 * Get form according to step
 *
 * @param {number} step - the step we want to go to next
 * @param {Function} handleChange - set from values
 * @param {Object} formData - current form values
 * @param {Function} handleNext - set next form
 * @param {Function} handleBack - set previous form
 * @param {Object[]} errors - array of errors
 * @returns {any} - returns form fields and footer buttons
 */
const getStepComponent = (
  step: number,
  handleChange: any,
  formData: any,
  handleNext: any,
  handleBack: any,
  errors: any
) => {
  switch (step) {
    case 1:
      return (
        <>
          <h2 style={{ fontWeight: "bold" }}>Personal Details</h2>
          <FormBuilder
            fields={personalFields}
            handleChange={handleChange}
            values={formData}
            errors={errors}
          />
          <div style={{ textAlign: "right", paddingTop: "10px" }}>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleNext(formData, personalFields);
              }}
            >
              Next
            </button>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <h2 style={{ fontWeight: "bold" }}>Destination Details</h2>
          <FormBuilder
            fields={destinationFields}
            handleChange={handleChange}
            values={formData}
            errors={errors}
          />
          <div className="button-container">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleBack();
              }}
            >
              Back
            </button>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleNext(formData, destinationFields);
              }}
            >
              Next
            </button>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <h2 style={{ fontWeight: "bold" }}>Guest Details</h2>
          <FormBuilder
            fields={guestFields}
            handleChange={handleChange}
            values={formData}
            errors={errors}
          />
          <div className="button-container">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleBack();
              }}
            >
              Back
            </button>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleNext(formData, guestFields);
              }}
            >
              Next
            </button>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <h2 style={{ fontWeight: "bold" }}>Confirmation</h2>
          <Confirmation data={formData} />

          <div className="button-container">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                handleBack();
              }}
            >
              Back
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </>
      );
  }
};

/**
 * Get form according to step
 *
 * @param {Function} handleChange - set from values
 * @param {string} startDate - start date of trip
 * @param {string} endDate - end date of trip
 *
 * @returns {any} - return date picker component with label
 */
const DateRangePicker = ({ handleChange, startDate, endDate }: any) => {
  const handleStartDateChange = (date: any) => {
    handleChange({ target: { value: date, name: "startDate" } });
  };

  const handleEndDateChange = (date: any) => {
    handleChange({ target: { value: date, name: "endDate" } });
  };

  return (
    <div
      className="date-picker"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="date-picker-input">
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="date-picker-input">
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
    </div>
  );
};

const Confirmation = ({ data }: any) => {
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

/**
 * TODO
 * mobile buttons styling
 * add some destinations
 * success massage
 */

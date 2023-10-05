import React, { useState } from "react";
import "./TravelForm.css";
import { validate } from "./utils";
import { FormBuilder } from "./FormBuilder";
import { personalFields, destinationFields, guestFields } from "./forms";
import { Confirmation } from "./components/ConfirmationDetails";


export const TravelFormWrapper = () => {
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
 * TODO
 * mobile buttons styling
 * add some destinations
 * success massage
 */

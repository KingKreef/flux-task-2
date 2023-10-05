import { FIELD_TYPES } from "./constants";
/**
 * Validates user inputs
 *
 * @param {any} data - input values submitted by user
 * @param {any} form - the form fields to check against
 * @returns {errors} - array of errors
 */
export const validate = (data: any, form: any) => {
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
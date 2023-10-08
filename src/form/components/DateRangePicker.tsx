import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../TravelForm.css";

/**
 * Get form according to step
 *
 * @param {Function} handleChange - set from values
 * @param {string} startDate - start date of trip
 * @param {string} endDate - end date of trip
 *
 * @returns {any} - return date picker component with label
 */
export const DateRangePicker = ({ handleChange, startDate, endDate }: any) => {
  const handleStartDateChange = (date: any) => {
    handleChange({ target: { value: date, name: "startDate" } });
  };

  const handleEndDateChange = (date: any) => {
    handleChange({ target: { value: date, name: "endDate" } });
  };

  return (
    <div className="date-picker">
      <div>
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
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

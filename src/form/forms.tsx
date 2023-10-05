import { FIELD_TYPES } from "./constants";

/**
 *  User details form fields
 */
export const personalFields: any = [
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
  export const destinationFields: any = [
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
 export const guestFields: any = [
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
  
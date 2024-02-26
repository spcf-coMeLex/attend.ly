import ROLES from "./roles";
import STATES from "./states";

const FORM_FIELDS = [
  {
    state: STATES.FIRST_NAME,
    label: "First Name",
    placeholder: "Enter your first name",
  },
  {
    state: STATES.MIDDLE_NAME,
    label: "Middle Name",
    placeholder: "Enter your middle name",
  },
  {
    state: STATES.LAST_NAME,
    label: "Last Name",
    placeholder: "Enter your last name",
  },
  {
    state: STATES.GENDER,
    label: "Gender",
    placeholder: "Enter your gender",
    isDropdown: true,
    dropdownData: [
      {
        label: "Please select a gender:",
        value: "",
        activeColor: "gray",
        inactiveColor: "gray",
      },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    state: STATES.BIRTHDAY,
    label: "Birthday",
    placeholder: "Enter your birthday",
    isDate: true,
  },
  {
    state: STATES.ADDRESS,
    label: "Address",
    placeholder: "Enter your address",
  },
  {
    state: STATES.PARENTS_EMAIL,
    label: "Parent's Email Address",
    placeholder: "Enter your parent's email address",
    isEmail: true,
    forRole: ROLES.STUDENT,
  },
  {
    state: STATES.PASSWORD,
    label: "Password",
    placeholder: "Enter your password",
    isPassword: true,
  },
  {
    state: STATES.CONFIRM_PASSWORD,
    label: "Confirm Password",
    placeholder: "Enter your password again",
    isPassword: true,
  },
];

export default FORM_FIELDS;

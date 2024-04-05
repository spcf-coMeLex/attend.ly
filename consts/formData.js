import ROLES from "./roles";
import branchData from "./school/branches";
import departmentData from "./school/departments";
import STATES from "./states";

const emptyDropdownValue = {
  value: "",
  activeColor: "gray",
  inactiveColor: "gray",
};

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
        ...emptyDropdownValue,
      },
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
      { label: "Other", value: "OTHER" },
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
  // {
  //   state: STATES.SECTION,
  //   label: "Section",
  //   placeholder: "Enter your section",
  //   isDropdown: true,
  //   dropdownData: [
  //     { label: "Please select a section:", ...emptyDropdownValue },
  //     ...sectionData,
  //   ],
  //   forRole: ROLES.STUDENT,
  // },
  // {
  //   state: STATES.PROGRAM,
  //   label: "Program",
  //   placeholder: "Enter your program",
  //   isDropdown: true,
  //   dropdownData: [
  //     { label: "Please select a program:", ...emptyDropdownValue },
  //     ...programData,
  //   ],
  //   forRole: ROLES.STUDENT,
  // },
  {
    state: STATES.BRANCH,
    label: "Branch",
    placeholder: "Enter your branch",
    isDropdown: true,
    dropdownData: [
      { label: "Please select a branch:", ...emptyDropdownValue },
      ...branchData,
    ],
    forRole: ROLES.TEACHER,
  },
  {
    state: STATES.DEPARTMENT,
    label: "Department",
    placeholder: "Enter your department",
    isDropdown: true,
    dropdownData: [
      { label: "Please select a department", ...emptyDropdownValue },
      ...departmentData,
    ],
    forRole: ROLES.TEACHER,
  },
  {
    state: STATES.PARENTS_EMAIL,
    label: "Parent's Email Address",
    placeholder: "Enter your parent's email address",
    isEmail: true,
    forRole: ROLES.STUDENT,
  },
  // {
  //   state: STATES.PASSWORD,
  //   label: "Password",
  //   placeholder: "Enter your password",
  //   isPassword: true,
  // },
  // {
  //   state: STATES.CONFIRM_PASSWORD,
  //   label: "Confirm Password",
  //   placeholder: "Enter your password again",
  //   isPassword: true,
  // },
];

export default FORM_FIELDS;

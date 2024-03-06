import AttendlyAPI from "./AttendlyAPI";

/**
 *
 * Teacher Services
 *
 */

export const createEmployee = async (employeeData) => {
  // Filter out all the form fields for employee
  const {
    role,
    branchName,
    departmentCode,
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
  } = employeeData;

  // Create new employee
  return await AttendlyAPI.post("/employees/create", {
    role,
    branchName,
    departmentCode,
    firstName,
    middleName,
    lastName,
    gender,
    birthDate,
  });
};

export const showTeacherDashboard = async (teacherId) => {
  return await AttendlyAPI.post("/employees/dashboard/show", {
    teacherUId: teacherId,
  });
};

export const showTeacherSection = async (teacherId) => {
  return await AttendlyAPI.post("/employees/section/show", {
    teacherUId: teacherId,
  });
};

export const showTeacherSectionSubject = async (teacherId, sectionCode) => {
  return await AttendlyAPI.post("/employees/section-subject/show", {
    uid: teacherId,
    sectionCode,
  });
};

export const showTeacherSubject = async (subjectCode, status) => {
  return await AttendlyAPI.post("/employees/subject/show", {
    subjectCode,
    status,
  });
};

export const showTeacherStudentInfo = async (studentId) => {
  return await AttendlyAPI.post("/employees/student/show", {
    studentId,
  });
};

/**
 *
 * Student Services
 *
 */

export const createStudent = async (studentData) => {
  // Filter out all the form fields for student
  const {
    role,
    programCode,
    branchName,
    departmentCode,
    sectionCode,
    firstName,
    middleName,
    lastName,
    parentsEmail,
    gender,
    birthDate,
    address,
  } = studentData;

  // Create new student
  return await AttendlyAPI.post("/students/create", {
    role,
    programCode,
    branchName,
    departmentCode,
    sectionCode,
    firstName,
    middleName,
    lastName,
    parentsEmail,
    gender,
    birthDate,
    address,
  });
};

export const showStudentWallet = async (studentId) => {
  return await AttendlyAPI.post("/students/wallet/show", {
    studentId,
  });
};

/**
 *
 * Attendance Services
 *
 */

export const createAttendance = async (attendanceData) => {
  // Filter out all the form fields for attendance
  const { teacherId, studentId, sectionSubjectCode, date, time } =
    attendanceData;

  // Create new attendance
  return await AttendlyAPI.post("/attendance/create", {
    uId: teacherId,
    studentId,
    sectionSubjectCode,
    date,
    time,
  });
};

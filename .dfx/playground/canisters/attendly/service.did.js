export const idlFactory = ({ IDL }) => {
  const Day = IDL.Variant({
    'Saturday' : IDL.Null,
    'Thursday' : IDL.Null,
    'Sunday' : IDL.Null,
    'Tuesday' : IDL.Null,
    'Friday' : IDL.Null,
    'Wednesday' : IDL.Null,
    'Monday' : IDL.Null,
  });
  const StatusType = IDL.Variant({ 'In' : IDL.Null, 'Out' : IDL.Null });
  const Attendance = IDL.Record({
    'day' : Day,
    'studentId' : IDL.Principal,
    'time' : IDL.Text,
    'classId' : IDL.Text,
    'attendanceType' : StatusType,
    'subjectId' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : Attendance, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  return IDL.Service({
    'createAttendance' : IDL.Func([IDL.Text, Attendance], [Result], []),
    'employeesRegister' : IDL.Func([IDL.Text], [Result], []),
    'getAttendances' : IDL.Func([], [IDL.Vec(Attendance)], ['query']),
    'getEmployees' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getStudents' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'showAttendance' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'showEmployee' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'showStudent' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'studentRegister' : IDL.Func([IDL.Text], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };

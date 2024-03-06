export const idlFactory = ({ IDL }) => {
  const Student = IDL.Record({
    'name' : IDL.Text,
    'section' : IDL.Text,
    'course' : IDL.Text,
  });
  return IDL.Service({
    'getStudents' : IDL.Func([], [IDL.Vec(Student)], ['query']),
    'register' : IDL.Func([Student], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

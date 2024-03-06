import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Attendance {
  'day' : Day,
  'studentId' : Principal,
  'time' : string,
  'classId' : string,
  'attendanceType' : StatusType,
  'subjectId' : string,
}
export type Day = { 'Saturday' : null } |
  { 'Thursday' : null } |
  { 'Sunday' : null } |
  { 'Tuesday' : null } |
  { 'Friday' : null } |
  { 'Wednesday' : null } |
  { 'Monday' : null };
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_2 = { 'ok' : Attendance } |
  { 'err' : string };
export type StatusType = { 'In' : null } |
  { 'Out' : null };
export interface _SERVICE {
  'createAttendance' : ActorMethod<[string, Attendance], Result>,
  'employeesRegister' : ActorMethod<[string], Result>,
  'getAttendances' : ActorMethod<[], Array<Attendance>>,
  'getEmployees' : ActorMethod<[], Array<Principal>>,
  'getStudents' : ActorMethod<[], Array<Principal>>,
  'showAttendance' : ActorMethod<[string], Result_2>,
  'showEmployee' : ActorMethod<[string], Result_1>,
  'showStudent' : ActorMethod<[string], Result_1>,
  'studentRegister' : ActorMethod<[string], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];

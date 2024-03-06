import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Student {
  'name' : string,
  'section' : string,
  'course' : string,
}
export interface _SERVICE {
  'getStudents' : ActorMethod<[], Array<Student>>,
  'register' : ActorMethod<[Student], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];

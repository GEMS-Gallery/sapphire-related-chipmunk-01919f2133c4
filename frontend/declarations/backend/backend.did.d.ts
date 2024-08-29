import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Time = bigint;
export interface Todo {
  'id' : bigint,
  'completedAt' : [] | [Time],
  'createdAt' : Time,
  'text' : string,
  'completed' : boolean,
}
export interface _SERVICE {
  'addTodo' : ActorMethod<[string], bigint>,
  'completeTodo' : ActorMethod<[bigint], undefined>,
  'deleteTodo' : ActorMethod<[bigint], undefined>,
  'getTodos' : ActorMethod<[], Array<Todo>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

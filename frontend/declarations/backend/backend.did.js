export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'completedAt' : IDL.Opt(Time),
    'createdAt' : Time,
    'text' : IDL.Text,
    'completed' : IDL.Bool,
  });
  return IDL.Service({
    'addTodo' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'completeTodo' : IDL.Func([IDL.Nat], [], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [], []),
    'getTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

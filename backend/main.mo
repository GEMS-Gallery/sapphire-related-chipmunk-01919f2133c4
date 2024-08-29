import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";

actor {
  type Todo = {
    id: Nat;
    text: Text;
    completed: Bool;
    createdAt: Time.Time;
    completedAt: ?Time.Time;
  };

  stable var todoCounter: Nat = 0;
  let todos = HashMap.HashMap<Nat, Todo>(10, Nat.equal, Nat.hash);

  public func addTodo(text: Text) : async Nat {
    let id = todoCounter;
    let todo: Todo = {
      id = id;
      text = text;
      completed = false;
      createdAt = Time.now();
      completedAt = null;
    };
    todos.put(id, todo);
    todoCounter += 1;
    id
  };

  public query func getTodos() : async [Todo] {
    Array.tabulate(todos.size(), func (i: Nat) : Todo {
      switch (todos.get(i)) {
        case (?todo) { todo };
        case null {
          {
            id = 0;
            text = "";
            completed = false;
            createdAt = 0;
            completedAt = null;
          }
        };
      }
    })
  };

  public func completeTodo(id: Nat) : async () {
    switch (todos.get(id)) {
      case (?todo) {
        let updatedTodo: Todo = {
          id = todo.id;
          text = todo.text;
          completed = true;
          createdAt = todo.createdAt;
          completedAt = ?Time.now();
        };
        todos.put(id, updatedTodo);
      };
      case null {}
    }
  };

  public func deleteTodo(id: Nat) : async () {
    todos.delete(id);
  };
}

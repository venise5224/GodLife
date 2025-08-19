"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg border-2 rounded-2xl min-h-[330px]">
      <h2 className="text-xl font-bold mb-4">할 일 목록</h2>

      {/* 입력창 */}
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="할 일을 입력하세요"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          추가
        </button>
      </form>

      {/* 투두 리스트 */}
      <ul className="space-y-2">
        {todos.length === 0 && (
          <li className="text-gray-400 text-center">할 일이 없습니다.</li>
        )}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer flex-1 ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput = ({ onAdd }: Props) => {
  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoName.trim()) return;
    onAdd(todoName.trim());
    setTodoName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        className="flex-1 p-2 border rounded-lg text-xs sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="할 일을 입력하세요 (Todo)"
      />
      <button
        type="submit"
        className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        추가
      </button>
    </form>
  );
};

export default TodoInput;

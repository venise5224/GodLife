function ActivityInputForm() {
  return (
    <form className="w-full bg-white p-4 rounded-2xl shadow-lg space-y-2 border-2">
      <input
        type="text"
        placeholder="활동 이름"
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <input type="time" className="flex-1 p-2 border rounded" />
        <input type="time" className="flex-1 p-2 border rounded" />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        저장
      </button>
    </form>
  );
}

export default ActivityInputForm;

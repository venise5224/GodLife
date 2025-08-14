function ActivityStats() {
  return (
    <section className="w-full max-w-md bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">오늘의 활동 통계</h2>
      <ul className="space-y-1 text-sm text-gray-700">
        <li>🍚 식사: 90분</li>
        <li>🚿 샤워: 20분</li>
        <li>📚 공부: 120분</li>
      </ul>
    </section>
  );
}

export default ActivityStats;

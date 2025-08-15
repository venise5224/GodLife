// function CircularTimeline() {
//   return (
//     <div className="w-72 h-72 bg-gray-200 rounded-full flex items-center justify-center">
//       <span className="text-gray-500">24시간 타임라인</span>
//     </div>
//   );
// }

// export default CircularTimeline;

export default function CircularTimeline() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 바깥 원 */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        {/* 예시 텍스트 */}
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="8">
          Timeline
        </text>
      </svg>
    </div>
  );
}

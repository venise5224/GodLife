const ListHeader = () => {
  return (
    <div className="flex px-2 py-2 text-sm text-gray-500">
      <div className="flex-1">이름</div>
      <div className="w-20 text-center">Source</div>
      <div className="w-30 text-center">시작</div>
      <div className="w-30 text-center">종료</div>
      <div className="w-30 text-center">소요 시간</div>
      <div className="w-16 text-center">삭제</div>
    </div>
  );
};

export default ListHeader;

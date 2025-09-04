const ListHeader = () => {
  return (
    <div className="flex mt-1 sm:mt-4 px-2 py-2 gap-10 sm:gap-0 text-xs sm:text-sm text-gray-500">
      <div className="flex-1">이름</div>
      <div className="hidden sm:block w-20 text-center">Source</div>
      <div className="hidden sm:block sm:w-30 text-center">시작</div>
      <div className="hidden sm:block sm:w-30 text-center">종료</div>
      <div className="sm:w-30 text-center">소요 시간</div>
      <div className="sm:w-16 text-center">삭제</div>
    </div>
  );
};

export default ListHeader;

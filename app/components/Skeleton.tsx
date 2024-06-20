export function Skeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-1.5 bg-gray-200 rounded-full w-[18.5rem] mb-2.5"></div>
      <div className="h-1.5 bg-gray-200 rounded-full w-[90%] max-w-[360px] mb-2.5"></div>
      <div className="h-1.5 bg-gray-200 rounded-full w-[80%] mb-2.5"></div>
      <div className="h-1.5 bg-gray-200 rounded-full w-[90%] max-w-[330px] mb-2.5"></div>
      <div className="h-1.5 bg-gray-200 rounded-full w-[95%] max-w-[300px] mb-2.5"></div>
      <div className="h-1.5 bg-gray-200 rounded-full w-[95%] max-w-[360px]"></div>
    </div>
  );
}

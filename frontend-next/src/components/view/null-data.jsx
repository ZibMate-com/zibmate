export const NullData = ({ viewTab }) => {
  return (
    <div className="w-full h-full  text-center mt-10">
      <h1 className="text-2xl font-sans text-zinc-400"> Oops! We couldn’t find any {viewTab} right now.</h1>
    </div>
  );
};

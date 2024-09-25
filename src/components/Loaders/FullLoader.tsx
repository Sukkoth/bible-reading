import { ScaleLoader } from "react-spinners";

function FullLoader() {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col'>
      <ScaleLoader
        color='#16a34a'
        className='text-primary hidden dark:block'
        speedMultiplier={0.85}
      />
      <h1 className='text-xl pt-3 font-medium uppercase text-primary dark:text-white animate-pulse'>
        Loading
      </h1>
    </div>
  );
}

export default FullLoader;

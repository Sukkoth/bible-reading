import { ScaleLoader } from "react-spinners";

function MainLoader() {
  return (
    <div className='h-[100dvh] w-full flex flex-col items-center justify-center'>
      <ScaleLoader
        color='#16a34a'
        className='text-primary hidden dark:block'
        speedMultiplier={0.85}
      />
      <h1 className='text-3xl pt-5 font-medium uppercase text-primary dark:text-white'>
        Bible Reader
      </h1>
    </div>
  );
}

export default MainLoader;

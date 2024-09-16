import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <section className='max-w-[480px] p-3 px-5 mx-auto min-h-[100dvh] grid grid-[1fr] main-layout'>
      <Outlet />
    </section>
  );
}

export default MainLayout;

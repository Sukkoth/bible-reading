import { BiBook, BiLogOut } from "react-icons/bi";
import { CgClose, CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

type DrawerProps = {
  show: boolean;
  onClose: () => void;
};

function Drawer({ show, onClose }: DrawerProps) {
  return (
    <div
      className={`absolute top-0 bottom-0 border bg-background z-30 w-[20rem] py-5 flex flex-col ${
        show ? "right-0" : "-right-80"
      } transition-all duration-500`}
    >
      <div
        className='text-primary hover:opacity-80 cursor-pointer self-end me-5'
        onClick={onClose}
      >
        <CgClose className='text-3xl' />
      </div>
      <ul>
        {drawerItems.map((item) => (
          <DrawerItem {...item} key={item.label} />
        ))}
      </ul>
    </div>
  );
}

const drawerItems = [
  {
    icon: <BiBook />,
    label: "My Plans",
    to: "/plans/all",
  },
  {
    icon: <CgProfile />,
    label: "Profile",
    to: "/profile",
  },
  {
    icon: <IoSettings />,
    label: "Settings",
    to: "/settings",
  },
  {
    icon: <BiLogOut />,
    label: "Logout",
    to: "/logout",
  },
];

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
};
function DrawerItem({ icon, label, to }: ItemProps) {
  return (
    <li className='flex gap-2 items-center py-3 px-8 cursor-pointer hover:bg-secondary transition-colors duration-300'>
      {icon} <Link to={to}>{label}</Link>
    </li>
  );
}

export default Drawer;

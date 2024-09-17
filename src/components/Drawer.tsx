import { useLogout } from "@/react-query/mutations";
import { BiBook, BiLogOut } from "react-icons/bi";
import { CgClose, CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTheme } from "@/Providers/ThemeProvider";
import { MoonIcon } from "@radix-ui/react-icons";

type DrawerProps = {
  show: boolean;
  onClose: () => void;
};

function Drawer({ show, onClose }: DrawerProps) {
  const handleLogout = useLogout();
  const { handleSetTheme } = useTheme();
  return (
    <div
      className={`absolute top-0 bottom-0 border bg-background z-30 w-[20rem] py-5 flex flex-col ${
        show ? "right-0" : "-right-80"
      } transition-all duration-300 opacity-100`}
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
        <DrawerItem
          label='Switch Theme'
          icon={<MoonIcon />}
          onClick={() => handleSetTheme()}
        />
        <AlertDialog>
          <AlertDialogTrigger className='w-full'>
            <DrawerItem icon={<BiLogOut />} label='Logout' />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                By continuing, you logout from your current session in use
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleLogout.mutate()}
                className='bg-red-700 hover:bg-red-600'
              >
                {handleLogout.isPending ? "Logging out" : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
];

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  onClick?: () => void;
};
function DrawerItem({ icon, label, to, onClick }: ItemProps) {
  return (
    <li
      className='flex gap-3 items-center py-3 px-8 cursor-pointer hover:bg-secondary transition-colors duration-300'
      onClick={onClick && onClick}
    >
      {icon}
      {to ? <Link to={to}>{label}</Link> : label}
    </li>
  );
}

export default Drawer;

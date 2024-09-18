import SideBar from "./_components/SideBar";
import { FaBarsStaggered } from "react-icons/fa6";
export default function RootLayout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input className="drawer-toggle" type="checkbox" id="my-drawer-3" />
      <div className="drawer-content">
        <label className="drawer-button lg:hidden fixed top-6 right-6 " htmlFor="my-drawer-3">
          <FaBarsStaggered className="text-primary w-8 h-8" />
        </label>
        <div className="bg-base-200 px-8py-12 min-h-screen">{children}</div>
      </div>
      <div className="drawer-side ">
        <label className="drawer-overlay" htmlFor="my-drawer-3" aria-label="Close sidebar "></label>
        <SideBar />
      </div>
    </div>
  );
}

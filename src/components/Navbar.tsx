import Link from "next/link";
import { navbarItems } from "../lib/navbarItems";

function Navbar() {
  return (
    <div className="flex w-full items-center gap-6 border-b-[1px] border-gray-400 bg-gray-700 py-4 pl-6 text-gray-200">
      <div>LOGO</div>
      {navbarItems.map((item) => (
        <div key={item.id}>
          <Link href={item.href}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;

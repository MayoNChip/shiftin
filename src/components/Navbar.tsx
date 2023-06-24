import Link from "next/link";
import { navbarItems } from "../lib/navbarItems";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { SignIn } from "@clerk/clerk-react";
import { Button } from "@mui/material";

function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  return (
    <div className="flex w-full items-center justify-between border-b-[1px] border-gray-400 bg-gray-700 px-4 py-4 pl-6 text-gray-200">
      <div className="flex items-center gap-6">
        <div>LOGO</div>
        {navbarItems.map((item) => (
          <div key={item.id}>
            <Link href={item.href}>{item.title}</Link>
          </div>
        ))}
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link href="/sign-out">
            <Button onClick={() => signOut()}>Sign Out</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;

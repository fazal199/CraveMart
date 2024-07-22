"use client";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { navItems } from "../../../constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

export function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();




  return (
    <header className="box-shadow-light py-2">
      <div className="flex h-16 w-full items-center shadow-sm justify-between bg-background px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src={"/logo.jpg"}
            alt="logo"
            priority={false}
            className="rounded-full h-[50px] shadow-sm shadow-black"
            height={100}
            width={50}
          ></Image>
          <span className="text-lg font-semibold">CraveMart</span>
        </Link>
        <nav className=" flex">
          <ul className="flex items-center gap-10 capitalize">
            {navItems.map((item) => {

              if (item.link == "/profile" && !isSignedIn)
                return;

              return <li key={item.name}>
                <Link
                  href={item.link}
                  className={`text-lg font-medium ${pathname == item.link && "underline"
                    } decoration-4 underline-offset-[6px] decoration-first-500 hover:underline-offset-4`}
                  prefetch={false}
                >
                  {item.name}
                </Link>
              </li>
            }
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-4">

          <SignedIn>
            <SignOutButton>
              <Button

                variant="outline"
                className=" font-semibold w-full bg-first-800 text-white rounded-lg shadow-sm shadow-black border-none"
              >
                Logout
              </Button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Link href={"/sign-in"}>
              <Button

                variant="outline"
                className=" font-semibold w-full bg-first-800 text-white rounded-lg shadow-sm shadow-black border-none"
              >
                Login
              </Button>
            </Link>
          </SignedOut>

          <Avatar className="h-10 w-10 border-purple-500 border-2">
            <AvatarImage src={sessionStorage.getItem("avatar") || "/placeholder-user.webp"} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>

        </div>
      </div>
    </header>
  );
}

export default Header;

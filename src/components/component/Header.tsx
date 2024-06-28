"use client";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { navItems } from "../../../constants";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="box-shadow-light py-2">
      <div className="flex h-16 w-full items-center shadow-sm justify-between bg-background px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            src={"/logo.jpg"}
            alt="logo"
            className="rounded-full h-[50px] shadow-sm shadow-black"
            height={100}
            width={50}
          ></Image>
          <span className="text-lg font-semibold">CraveMart</span>
        </Link>
        <nav className=" flex">
          <ul className="flex items-center gap-10 capitalize">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`text-lg font-medium ${
                    pathname == item.link && "underline"
                  } decoration-4 underline-offset-[6px] decoration-first-500 hover:underline-offset-4`}
                  prefetch={false}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border-purple-500 border-2">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;

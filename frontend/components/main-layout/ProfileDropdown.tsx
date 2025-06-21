import { auth, signOut } from "@/auth/auth";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ProfileDropdown = async () => {
  const session = await auth();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-400 hover:text-white">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>

          {session?.user?.image ? (
            <Image
              alt={"user avatar"}
              src={session.user.image}
              className="rounded-full"
              height={32}
              width={32}
              priority={true}
            />
          ) : (
            <UserCircleIcon aria-hidden="true" className="size-6 " />
          )}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {session?.user ? (
          <>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Mis datos
              </a>
            </MenuItem>
            <MenuItem>
              <button
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                Cerrar cesión
              </button>
            </MenuItem>
          </>
        ) : (
          <Link href={"/login"}>
            <MenuItem>
              <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none">
                Iniciar cesión
              </button>
            </MenuItem>
          </Link>
        )}
      </MenuItems>
    </Menu>
  );
};

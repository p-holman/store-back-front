import { PackagePlus } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch">
            <div className="flex shrink-0 items-center">
              <Link href={"/publisher"}>
                <button className="rounded-md flex flex-col justify-center p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <PackagePlus
                    strokeWidth={1.5}
                    // absoluteStrokeWidth
                    className="h-8 w-auto"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

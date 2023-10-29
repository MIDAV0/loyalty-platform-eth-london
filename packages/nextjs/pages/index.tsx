import Link from "next/link";
import type { NextPage } from "next";
import { ShoppingCartIcon, ShoppingBagIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-center mb-8">Loyalty Program Platform</h1>
            <h1>Continue as</h1>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                <Link href="/Customer" passHref className="link">
                  Customer
                </Link>
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href="/Business" passHref className="link">
                  Business
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BuildingStorefrontIcon className="h-8 w-8 fill-secondary" />
              <p className="gap-4">Grow your business with extensive loyalty progams</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ShoppingCartIcon className="h-8 w-8 fill-secondary" />
              <p>Gain loyal customers</p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <ShoppingBagIcon className="h-8 w-8 fill-secondary" />
              <p>Enjoy rewards from your favorite shops</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

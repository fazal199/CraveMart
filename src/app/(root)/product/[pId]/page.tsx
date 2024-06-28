import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { PlusIcon, MinusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductDetailPage = () => {
  const products = [
    {
      id: 1,
      name: "Cozy Sweater",
      price: 49.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Leather Backpack",
      price: 79.99,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Stylish Sunglasses",
      price: 29.99,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Comfortable Sneakers",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Elegant Dress",
      price: 89.99,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Durable Suitcase",
      price: 99.99,
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Chic Scarf",
      price: 24.99,
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Sleek Wallet",
      price: 39.99,
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Sleek Wallet",
      price: 39.99,
      image: "/placeholder.svg",
    },
  ];
  return (
    <>
      <section>
        <div className="grid grid-cols-2 gap-12 max-w-6xl px-4 mx-auto py-12">
          <figure className="grid gap-4">
            <Image
              src="/categories_images/electronics.jpg"
              alt="Product Image"
              height={100}
              width={200}
              className="object-cover h-full border w-full rounded-lg overflow-hidden"
            />
          </figure>
          <div className="">
            <div className="">
              <h1 className="font-bold text-4xl">Acme Prism T-Shirt</h1>

              <p className="mt-4">
                60% combed ringspun cotton/40% polyester jersey tee.
              </p>

              <div className="text-4xl font-bold mt-4">
                <span className="text-xl font-medium">Price:</span> $99
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="quantity" className="text-base">
                Quantity:
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <PlusIcon />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  5
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <MinusIcon />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-7 w-full bg-first-800 text-white rounded-lg shadow-sm shadow-black border-none"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-16 max-w-6xl mx-auto">
        <h5 className="text-center font-semibold text-5xl">Similar Products</h5>
        <div className="mt-10 grid grid-cols-3 w-full gap-6">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;

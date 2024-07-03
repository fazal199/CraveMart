"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ id, name, price }: any) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      key={id}
      className="bg-background rounded-lg shadow-lg overflow-hidden"
    >
      <Image
        src="/placeholder.svg"
        alt={name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold mt-2">{name}</h3>
        <p className="text-muted-foreground mt-2">${price}</p>
        <Button
          onClick={() => router.push(`/product/${id}`)}
          variant="outline"
          className="mt-4 w-full bg-first-800 text-white rounded-lg shadow-sm shadow-black border-none"
        >
          Continue...
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

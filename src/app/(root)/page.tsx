"use client";
import React from "react";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "../../components/shared/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const HomePage = () => {

  const searchParams = useSearchParams();
  const categorie = searchParams.get("category");
  const user = useAuth();
  console.log(user);
  

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
      id: 9,
      name: "Sleek Wallet",
      price: 39.99,
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="grid  grid-cols-[300px_1fr] gap-8 p-6">
      <FilterSidebar />
      <div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        <Pagination className="mt-4  text-black py-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default HomePage;

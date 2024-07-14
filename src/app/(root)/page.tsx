"use client";
import React, { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getDataApi } from "@/utils/apiFunctions";
import { useDispatch } from "react-redux";
import { setProducts } from "@/lib/store/features/allproducts/allProductsSlice";
import { AppDispatch } from "@/lib/store/store";
import ProductGrid from "./components/ProductGrid";

const HomePage = () => {

  //toast notification
  const { toast } = useToast()

  const searchParam = useSearchParams()

  //state to manage pages
  const [page, setPage] = useState<number>(1)

  //state to manage price
  const [price, setPrice] = useState<number>(1000)

  //state to manage categories
  const [categories, setCategories] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();

  //making api call first time and whenever the data page or price or categories changes
  const { data, isError, isLoading } = useQuery({
    queryKey: ['allproducts', page, price, categories],
    queryFn: () => getDataApi(`/api/products/allproducts?page=${page}&price=${price}&categories=${categories.length != 0 ? categories : '[]'}`, "Product Data Fetched!", "Something went wrong while fetching productData!", "root component", toast),
  })


  //storing previous and nextpage number
  const hasPreviousPage = data?.data?.hasPrevPage;
  const hasNextPage = data?.data?.hasNextPage;

  //storing the product data into the redux state
  if (data?.data?.productsData)
    dispatch(setProducts(data.data.productsData))

  const category = searchParam.get("category")

  useEffect(() => {
    setPage(1);
  }, [categories, price])


  useEffect(() => {
    if (category)
      setCategories([...categories, category])
  }, [])


  return (
    <section className="grid  grid-cols-[300px_1fr] gap-8 p-6">
      <FilterSidebar categories={categories} setCategories={setCategories} price={price} setPrice={setPrice} />
      <div>
        <ProductGrid allproducts={data?.data?.productsData} isLoading={isLoading} isError={isError} />
        <Pagination className="mt-4  text-black py-3">
          <PaginationContent>
            <PaginationItem className="hover:cursor-pointer">
              <PaginationPrevious onClick={() => { if (hasPreviousPage) setPage(data?.data?.prevPage) }} className={`${!hasPreviousPage && 'active:bg-white opacity-60 hover:cursor-pointer'}`} />
            </PaginationItem>
            {hasPreviousPage && <PaginationItem className="hover:cursor-pointer">
              <PaginationLink onClick={() => setPage(data?.data?.prevPage)}>{data?.data?.prevPage}</PaginationLink>
            </PaginationItem>}
            <PaginationItem className="hover:cursor-pointer">
              <PaginationLink isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            {hasNextPage && <PaginationItem className="hover:cursor-pointer">
              <PaginationLink onClick={() => setPage(data?.data?.nextPage)}>{data?.data?.nextPage}</PaginationLink>
            </PaginationItem>}
            <PaginationItem className="hover:cursor-pointer">
              <PaginationNext onClick={() => { if (hasNextPage) setPage(data?.data?.nextPage) }} className={`${!hasNextPage && 'active:bg-white opacity-60 hover:cursor-pointer'}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default HomePage;

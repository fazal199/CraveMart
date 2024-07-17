"use client"
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getDataApi, sendDataApi } from "@/utils/apiFunctions";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, MinusIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ProductDetailPage = () => {

  const queryClient = useQueryClient();
  const { toast } = useToast();

  //the id of the product
  const { pId } = useParams();
  const { userId } = useAuth();


  //fetching products detail data as well as similar products
  const { data, isLoading, isError } = useQuery({ queryKey: ['product'], queryFn: () => getDataApi(`/api/products/${pId}`, 'Product Data Fetched!', 'Something Went Wrong While Fetching Product Data!', 'Error On Product Details Page!', toast) })

  //state to set quantity
  const [quantity, setQuantity] = useState<number>(1);

  //mainProduct Detail data
  const mainProduct = data?.data?.mainProduct;

  //similar products
  const similarProducts = data?.data?.similarProducts;


  //using react query to send data to the server
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendDataApi,
    onSuccess: () => {
      toast({ title: "Product Added to the Cart Successfully!" })
      queryClient.invalidateQueries({ queryKey: ['cartproducts'] })
    },
    onError: () => {
      toast({ title: "Something Went wrong while adding the product to the Cart!" })
      console.log(error);
    }
  });

  //function to handle quantity
  const handleQuantity = (action: string) => {
    if (action == "add")
      setQuantity(quantity + 1);

    else {
      if (quantity == 1)
        return

      setQuantity(quantity - 1)
    }
  }

  //function to make api post call and passing the data in it!
  const handleCart = () => {
    mutate({
      url: '/api/cart',
      postData: { productId: pId, quantity, clerkId: userId },
      successMessage: "Product Added To Cart!",
      failureMessage: "Something Went wrong, Product Could not be added to cart!",
      placeName: 'Error On Product Detail Page!',
      toast,
    });
  }

  return (
    <>
      {!isLoading ? (

        !isError ? (
          <>
            <section>
              {mainProduct ? (<div className="grid grid-cols-2 gap-12 max-w-6xl px-4 mx-auto py-12">
                <figure className="grid gap-4">
                  <Image
                    src={mainProduct.image}
                    alt={mainProduct.title}
                    height={100}
                    width={200}
                    className="object-contain h-[50vh] border w-full rounded-lg overflow-hidden"
                  />
                </figure>
                <div className="">
                  <div className="">
                    <h1 className="font-bold text-4xl">{mainProduct.title}</h1>

                    <p className="mt-4">
                      {mainProduct.description}
                    </p>

                    <div className="text-4xl font-bold mt-4">
                      <span className="text-xl font-medium">Price:</span> ₹{mainProduct.price}
                    </div>
                  </div>

                  <div className="mt-5">
                    <Label htmlFor="quantity" className="text-base">
                      Quantity:
                    </Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Button onClick={() => handleQuantity("add")} variant="outline" size="icon" className="h-10 w-10">
                        <PlusIcon />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        {quantity}
                      </Button>
                      <Button onClick={() => handleQuantity("sub")} variant="outline" size="icon" className="h-10 w-10">
                        <MinusIcon />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleCart}
                    variant="outline"
                    className="mt-7 w-full bg-first-800 text-white rounded-lg shadow-sm shadow-black border-none"
                  >
                    {isPending ? 'Loading' : 'Add To Cart'}
                  </Button>
                </div>
              </div>) : <h1>No Product Found!</h1>}
            </section>
            <section className="mt-16 max-w-6xl mx-auto">
              <h5 className="text-center font-semibold text-5xl">Similar Products</h5>
              {similarProducts ? (<div className="mt-16 grid grid-cols-3 w-full gap-10">
                {similarProducts.map((product: any) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.title}
                    price={product.price}
                    imgSrc={product.image}
                  />
                ))}
              </div>) : (<h1>No Similar Products For This One!</h1>)}
            </section>
          </>) : (
          <h1>Something went wrong!</h1>
        )
      ) : (
        <h1>loading ho rhi hai</h1>
      )}
    </>
  );
};

export default ProductDetailPage;

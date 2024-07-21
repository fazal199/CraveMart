"use client"
import ProductCard from '@/components/shared/ProductCard';
import React from 'react'

type ProductGridType = {
    isLoading: boolean,
    isError: boolean,
    allproducts: any,
}

const ProductGrid = ({ allproducts, isLoading, isError }: ProductGridType) => {


    return (
        <div className="grid grid-cols-3 gap-6">
            {
                !isLoading ? (

                    !isError ? (

                        allproducts ? (
                            allproducts.map((product: any) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.title}
                                    price={product.price}
                                    imgSrc={product.image}
                                />
                            ))
                        ) : (
                            <h1>No Products Found!</h1>
                        )

                    ) : (
                        <h1>oops something went wrong!</h1>
                    )

                ) : (
                    <h1>loading horahai hai!</h1>
                )
            }

        </div >
    )
}

export default ProductGrid

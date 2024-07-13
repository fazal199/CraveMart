"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { memo, SetStateAction, useState } from "react";
import { useDebounceCallback } from "usehooks-ts"
import { useQuery } from "@tanstack/react-query";
import { getDataApi } from "@/utils/apiFunctions";
import { useToast } from "@/components/ui/use-toast";

type FilterSidebarType = {
  setPrice: React.Dispatch<SetStateAction<number>>,
  price: number,
  categories: Array<string>,
  setCategories: React.Dispatch<SetStateAction<string[]>>
}

const FilterSidebar = ({ price, setPrice, categories, setCategories }: FilterSidebarType) => {

  const { toast } = useToast();
  //state to update the client side price quickly
  const [clientPrice, setClientPrice] = useState<number>(1000);

  //debounce setPrice
  const debounceSetPrice = useDebounceCallback(setPrice, 1500);

  //fetching categories 
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getDataApi('/api/categories', 'categories fetched!', 'something went wrong while fetching categories!', 'FilterSideBar component', toast)
  })


  const handleCategory = (action: any, categoryId: any) => {

    let tempCategories = [...categories];
    if (action) {
      tempCategories.push(categoryId);
      setCategories(tempCategories);
    }

    else {
      tempCategories.splice(tempCategories.indexOf(categoryId), 1);
      setCategories(tempCategories)
    }

    console.log(action, categoryId);

  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Filters For Products</h2>
      <div className="grid gap-4">
        <div className="mt-5">
          <h3 className="text-base font-semibold mb-2">Category</h3>
          <div className="grid gap-5 mt-5">
            {
              data?.data.length != 0 ? (
                data?.data.map((item: any) => (
                  <Label key={item._id} className="flex items-center gap-2">
                    <Checkbox onCheckedChange={(e) => handleCategory(e, item.categoryId)} value={item.categoryId} />
                    {item.categoryName.toUpperCase()}
                  </Label>
                ))
              ) : (
                <h1>No Categories Found!</h1>
              )
            }

          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-base font-semibold mb-2">
            Price:
            <div className="text-center w-full mt-4 font-bold text-lg">₹{clientPrice}</div>
          </h3>
          <Slider
            min={0}
            max={1000}
            step={100}
            defaultValue={[price]}
            onValueChange={(e) => { debounceSetPrice(e[0]), setClientPrice(e[0]) }}
            className="w-full bg-first-500 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(FilterSidebar);

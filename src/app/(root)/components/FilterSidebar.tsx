"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";
import { categoriesItems } from "../../../../constants";

const FilterSidebar = () => {
  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Filters For Products</h2>
      <div className="grid gap-4">
        <div className="mt-5">
          <h3 className="text-base font-semibold mb-2">Category</h3>
          <div className="grid gap-5 mt-5">
            {categoriesItems.map((item) => (
              <Label className="flex items-center gap-2">
                <Checkbox value={item.name} />
                {item.uiName}
              </Label>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-base font-semibold mb-2">Price</h3>
          <Slider
            min={0}
            max={100}
            step={1}
            className="w-full bg-first-500 rounded-md"
          />

          <div className="text-center w-full mt-4 font-bold text-lg">$78</div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

import Link from "next/link";
import React from "react";
import { categoriesItems } from "../../../../constants";
import Image from "next/image";

const CategoryPage = () => {
  return (
    <section className="w-full py-12">
      <h1 className="text-center text-6xl font-semibold mb-12">Categories</h1>
      <div className="container grid  gap-6 grid-cols-2">
        {categoriesItems.map((categorie) => (
          <CategoryCard
            key={categorie.link}
            link={categorie.link}
            categoryName={categorie.uiName}
            imgSrc={categorie.imgSrc}
            alt={categorie.alt}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryCard = ({ link, categoryName, imgSrc, alt }: any) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      <Link href={link} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View</span>
      </Link>
      <Image
        src={imgSrc}
        alt={alt}
        width={400}
        height={400}
        className="object-cover w-full h-64 transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-0 flex items-end p-6 text-white">
        <h3 className="text-xl font-bold tracking-tight">{categoryName}</h3>
      </div>
    </div>
  );
};

export default CategoryPage;

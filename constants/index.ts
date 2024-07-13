const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "Cart",
    link: "/cart",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const categoriesItems = [
  {
    name: "menswear",
    uiName: "Menswear",
    imgSrc: "/categories_images/menswear.jpg",
    alt: "menswear",
    link: "/?category=1",
  },
  {
    name: "womenswear",
    uiName: "Womenswear",
    imgSrc: "/categories_images/womenswear.webp",
    alt: "womenswear",
    link: "/?category=2",
  },
  {
    name: "jewellery",
    uiName: "Jewellery",
    imgSrc: "/categories_images/jewellery.jpg",
    alt: "jewellery",
    link: "/?category=3",
  },
  {
    name: "electronics",
    uiName: "Electronics",
    imgSrc: "/categories_images/electronics.jpg",
    alt: "electronics",
    link: "/?category=4",
  },
];

export { navItems, categoriesItems };

type ProductData = {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  isSold: boolean;
  watchedBy: object[];
}

const products: ProductData[] = [
  {
    name: "Lamp",
    description: "Lovely blue lamp in working condition. Sure to brighten up your desk.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1644093373/lamp_j5wfxz.webp",
    category: "Electronics",
    price: 12,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Ted Baker Shirt",
    description: "Size Medium. Hardly worn, great for a night out on the town!",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1644093373/tedbaker_isn3nl.webp",
    category: "Clothing",
    price: 20,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Paul Smith Shirt",
    description: "Size Large. Excellent condition and a real head-turner!",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1644093373/paulsmith_w8iwfv.webp",
    category: "Clothing",
    price: 25,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Ray-Ban sunglasses",
    description: "Gold framed aviators",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1644093373/rayban_itxxpz.webp",
    category: "Clothing",
    price: 30,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Winter coat",
    description: "Arcteryx winter coat. Guaranteed to keep you warm and dry whatever the weather.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/coat_hiiz7o.webp",
    category: "Clothing",
    price: 150,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Gold swan necklace",
    description: "18K gold origami swan necklace.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/necklace_mfj5sw.webp",
    category: "Jewellery",
    price: 75,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Nintendo Switch",
    description: "Games console. Great fun for all ages!",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/switch_loifbn.webp",
    category: "Electronics",
    price: 160,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Air Jordan I (2020)",
    description: "A modern remake of the classic 1985 Air Jordan I - the original and best Jordans.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/trainers_isykwp.webp",
    category: "Clothing",
    price: 395,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Leather backpack",
    description: "A vintage leather backpack. Perfect for travels near and far.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/backpack_trub2n.webp",
    category: "Accessories",
    price: 40,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Ruark Speakers",
    description: "Desktop speakers with multiple inputs including Bluetooth. Deliver clear and expansive sound.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/speakers_bmdecl.webp",
    category: "Electronics",
    price: 250,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Acoustic guitar",
    description: "A guitar perfect for beginners.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/guitar_lppn9e.webp",
    category: "Musical Instruments",
    price: 50,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Leica MP",
    description: "A modern 35mm film camera with classic Leica looks and quality.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/leica_joyuie.webp",
    category: "Electronics",
    price: 3450,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Macbook Air 2017",
    description: "13-inch, 1440x900 display, 2.2GHz Intel Core i7, 8GB RAM, 256GB SSD. Currently running MacOS Sierra.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1643631407/macbook_lx5w6k.webp",
    category: "Electronics",
    price: 365,
    isSold: false,
    watchedBy: [],
  },
  {
    name: "Electric Standing Desk",
    description: "Single motor standing desk with a two-button controller. Height ranges from 720mm to 1200mm. White oak veneer tabletop measures 1200mm x 700mm and can hold up to 70kg - sturdy enough for two monitor set-up. Slight scuff marks on the white, steel legs.",
    image: "https://res.cloudinary.com/dbydj2jfx/image/upload/v1644945565/belu2kbt1ybbmhqo8zad.webp",
    category: "Furniture",
    price: 275,
    isSold: false,
    watchedBy: [],
  },
];


export default products;
export interface ProductImage {
  color: string;
  productImages: string[];
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  images: ProductImage[];
  bodyText: string;
  uploadedAt: string;
}

// export interface ProductsPageProps {
//   products: Product[];
// }

// export interface ProductPageProps {
//   product: Product;
// }

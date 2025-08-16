
// import Link from 'next/link';
// import Image from 'next/image';
// import { Product } from '@/types/product';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { ShoppingCart, Eye } from 'lucide-react';
// import { client } from '@/sanity/lib/client';

// export const productsQuery = `*[_type == "product"]{
//   title,
//   "slug": slug.current,
//   price,
//   "category": category->name,    
//   images[]{
//     "color": color->name,
//     "productImages":productImages[].asset->url
//   },
//   "bodyText": pt::text(body),
//   "uploadedAt":_createdAt
// }`;

// const options = { next: { revalidate: 30 } };


// export default async function ProductsPage() {
//   // try{

//     const products: Product[] = await client.fetch(productsQuery, {}, options);
//   // } catch (error) {
//   //   console.error('Error fetching products:', error);
//   //   return {
//   //     props: {
//   //       products: [],
//   //     },
//   //     revalidate: 60,
//   //   };
//   // }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover our amazing collection of products, carefully curated just for you.
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.slug} product={product} />
//           ))}
//         </div>

//         {/* Empty State */}
//         {products.length === 0 && (
//           <div className="text-center py-16">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
//             <p className="text-gray-600">Check back later for new products!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ProductCard({ product }: { product: Product }) {
//   const firstImage = product.images[0]?.productImages[0];
//   const hasMultipleColors = product.images.length > 1;

//   return (
//     <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//       <div className="relative aspect-square overflow-hidden">
//         {firstImage ? (
//           <img
//             src={firstImage}
//             alt={product.title}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-400">No Image</span>
//           </div>
//         )}
        
//         {/* Category Badge */}
//         <Badge className="absolute top-2 left-2" variant="secondary">
//           {product.category}
//         </Badge>
        
//         {/* Color Indicator */}
//         {hasMultipleColors && (
//           <div className="absolute top-2 right-2 flex gap-1">
//             {product.images.slice(0, 3).map((image, index) => (
//               <div
//                 key={index}
//                 className="w-3 h-3 rounded-full border border-white shadow-sm"
//                 style={{ backgroundColor: image.color?.toLowerCase() || '#gray' }}
//                 title={image.color}
//               />
//             ))}
//             {product.images.length > 3 && (
//               <span className="text-xs text-white bg-black bg-opacity-50 px-1 rounded">
//                 +{product.images.length - 3}
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg font-semibold line-clamp-2">
//           {product.title}
//         </CardTitle>
//         <CardDescription className="text-2xl font-bold text-primary">
//           ${product.price.toFixed(2)}
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="pt-0">
//         <p className="text-sm text-gray-600 line-clamp-2">
//           {product.bodyText}
//         </p>
//       </CardContent>

//       <CardFooter className="pt-2 gap-2">
//         <Link href={`/products/${product.slug}`} className="flex-1">
//           <Button variant="outline" className="w-full" size="sm">
//             <Eye className="w-4 h-4 mr-2" />
//             View Details
//           </Button>
//         </Link>
//         <Button size="sm" className="flex-1">
//           <ShoppingCart className="w-4 h-4 mr-2" />
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }




// app/products/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    title,
    "slug": slug.current,
    price,
    "category": category->name,    
    images[]{
      "color": color->name,
      "productImages": productImages[].asset->url
    },
    "bodyText": pt::text(body),
    "uploadedAt": _createdAt
  }`;
  
  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              {product.images[0]?.productImages[0] && (
                <img 
                  src={product.images[0].productImages[0]} 
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-xl">{product.title}</CardTitle>
              <CardDescription className="mt-2">
                {product.category}
              </CardDescription>
              <p className="mt-2 text-gray-600 line-clamp-2">
                {product.bodyText}
              </p>
              <p className="mt-2 font-bold text-lg">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/products/${product.slug}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 
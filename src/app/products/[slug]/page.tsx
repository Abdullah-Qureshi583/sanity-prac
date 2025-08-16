import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { groq } from "next-sanity";
import Image from "next/image";

async function getProduct(slug: string): Promise<Product> {
  console.log("before query the slug us : ", slug);

  const query = groq`*[_type == "product" && slug.current == $slug][0]{
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

  const product = await client.fetch(query, { slug });
  
  console.log(query);

  return product;
}
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("in main params : ", params.slug);

  const product = await getProduct(params.slug);

  if (!product) {
    return notFound();
  }
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={product.images[0]?.productImages[0]}
              alt={product.title}
              fill={true}
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.flatMap((imageSet) =>
              imageSet.productImages.map((img, idx) => (
                <div key={idx + imageSet.color} className="relative aspect-square">

                  <Image
                    src={img}
                    alt={`${product.title} - ${imageSet.color}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))
            )}
          </div>
        </div>
        {/* Product Details */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {product.title}
            </CardTitle>
            <p className="text-muted-foreground">{product.category}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-2xl font-semibold">${product.price}</p>

            <div className="space-y-2">
              <h3 className="font-medium">Colors Available</h3>
              <div className="flex gap-2">
                {product.images.map((imageSet) => (
                  <div
                    key={imageSet.color}
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: imageSet.color.toLowerCase() }}
                    title={imageSet.color}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {product.bodyText}
              </p>
            </div>
            <Button className="w-full" size="lg">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Notification from '@/components/Notification';

interface ProductProps {
  params: { id: string };
}

export default function ProductDetail({ params: { id } }: ProductProps) {
  // Fake product data
  const [product, setProduct] = useState({
    id,
    title: 'Stylish T-Shirt',
    description: 'A comfortable and stylish t-shirt',
    price: 29.99,
    reviews: [
      { id: 1, user: 'Alice', rating: 5, comment: 'Great quality!' },
      { id: 2, user: 'Bob', rating: 4, comment: 'Very comfortable.' },
    ],
  });

  const [notify, setNotify] = useState('');
  const router = useRouter();

  const addToCart = () => {
    // Implement cart logic (e.g., use a global state / context)
    setNotify('Product added to cart!');
  };

  const addToWishlist = () => {
    // Implement wishlist logic
    setNotify('Product added to wishlist!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {notify && <Notification message={notify} onClose={() => setNotify('')} />}
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
      <div className="flex gap-4 mb-6">
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add to Wishlist
        </button>
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <ul>
          {product.reviews.map((review) => (
            <li key={review.id} className="border p-2 rounded mb-2">
              <p>
                <strong>{review.user}</strong> - {review.rating} / 5
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
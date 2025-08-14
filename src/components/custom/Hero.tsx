// app/components/Hero.tsx (Server Component)
import { client } from "@/sanity/lib/client";
export type HeroSlideType = {
  _id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
};

const HERO_QUERY = `
    *[
        _type == "heroImages" 
        && defined(image) 
        && defined(title) 
        && defined(subTitle) 
    ]
    {
        _id,
        title,
        subTitle,
        "imageUrl": image.asset->url        
    }
`;
const options = { next: { revalidate: 30 } };

export default async function Hero() {
  // ✅ Server-side fetch (revalidate works here)
  const slides: HeroSlideType[] = await client.fetch(HERO_QUERY, {}, options);

  // Pass data to a client component that renders Swiper
  const HeroSlides = (await import("./HeroSlides")).default;
  return <HeroSlides slides={slides} />;
}

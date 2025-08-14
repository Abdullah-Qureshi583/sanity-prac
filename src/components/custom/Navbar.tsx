// 'use client';
// import Link from 'next/link';
// import { useState } from 'react';
// import { signOut, useSession } from 'next-auth/react';

// export default function Navbar() {
//   const { data: session } = useSession();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/">
//           <span className="text-xl font-bold">ClothingStore</span>
//         </Link>
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="xl:hidden text-gray-700"
//         >
//           Menu
//         </button>
//         <ul className={`flex-col xl:flex-row xl:flex ${menuOpen ? 'flex' : 'hidden'} gap-4`}>
//           <li>
//             <Link href="/products">Products</Link>
//           </li>
//           {session ? (
//             <>
//               <li>
//                 <Link href="/dashboard">Dashboard</Link>
//               </li>
//               <li>
//                 <button onClick={() => signOut()}>Sign Out</button>
//               </li>
//             </>
//           ) : (
//             <li>
//               <Link href="/auth/login">Sign In</Link>
//             </li>
//           )}
//           <li>
//             <Link href="/cart">Cart</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
import React from 'react'

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
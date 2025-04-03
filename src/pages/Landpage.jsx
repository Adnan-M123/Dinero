// import Image from 'next/image';
// import { Search } from 'lucide-react';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col">
//       {/* Navigation */}
//       <nav className="bg-[#2a3b22] px-6 py-3 flex justify-between items-center">
//         <div className="flex items-center">
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             alt="Dinero Logo"
//             width={40}
//             height={40}
//             className="bg-white rounded-full"
//           />
//         </div>
//         <button className="bg-[#e6dfd1] text-[#2a3b22] px-4 py-1 rounded-full text-sm font-medium">
//           Log in
//         </button>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative h-[500px]">
//         <div className="absolute inset-0">
//           <Image
//             src="/placeholder.svg?height=500&width=1200"
//             alt="Restaurant Interior"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
//           <h1 className="text-6xl font-serif mb-2">RESTAURANTS</h1>
//           <p className="mb-8">Find your next meal. Book the right place in time.</p>

//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search restaurant or meal"
//               className="w-full py-2 px-4 pr-10 rounded-full text-black"
//             />
//             <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
//               <Search size={20} />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Category Buttons */}
//       <section className="bg-[#e6dfd1] py-6 px-4">
//         <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
//           <CategoryButton label="Steak" count={12} color="bg-[#7a8a78]" />
//           <CategoryButton label="Pasta" count={17} color="bg-[#d1b78f]" />
//           <CategoryButton label="Bosnian cousine" count={20} color="bg-[#4a5c42]" />
//           <CategoryButton label="Vegan" count={7} color="bg-[#b17f56]" />
//           <CategoryButton label="Asian cousine" count={5} color="bg-[#5c6b3d]" />
//           <CategoryButton label="Cafes" count={19} color="bg-[#d1b78f]" />
//         </div>
//       </section>

//       {/* Featured Places */}
//       <section className="bg-[#e6dfd1] py-12 px-4">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-serif mb-8">Featured places:</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <RestaurantCard
//               name="Klopa"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#4a5c42]"
//             />
//             <RestaurantCard
//               name="Careva Cuprija"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#b17f56]"
//             />
//             <RestaurantCard
//               name="Cakum Pakum"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#4a5c42]"
//             />
//             <RestaurantCard
//               name="Apetit Restoran"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#b17f56]"
//             />
//             <RestaurantCard
//               name="Kibe Mahala"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#4a5c42]"
//             />
//             <RestaurantCard
//               name="Zeljo Cevabdzinica"
//               description="Lorem ipsum tux nana nestu pire."
//               color="bg-[#d1b78f]"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Process Steps */}
//       <section className="bg-[#e6dfd1] py-12 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <ProcessStep
//             imageSrc="/placeholder.svg?height=100&width=100"
//             description="Select your restaurant, pick a date & time, and send your reservation request!"
//           />
//           <ProcessStep
//             imageSrc="/placeholder.svg?height=100&width=100"
//             description="The restaurant reviews and confirms your booking in real time!"
//           />
//           <ProcessStep
//             imageSrc="/placeholder.svg?height=100&width=100"
//             description="Arrive, get seated instantly, and enjoy your meal—no waiting!"
//           />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#2a3b22] text-white py-8 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-serif mb-4">Website</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="#">Privacy Policy</Link>
//               </li>
//               <li>
//                 <Link href="#">Terms of Service</Link>
//               </li>
//               <li>
//                 <Link href="#">Newsletter</Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-xl font-serif mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="#">About Us</Link>
//               </li>
//               <li>
//                 <Link href="#">Help</Link>
//               </li>
//               <li>
//                 <Link href="#">FAQs</Link>
//               </li>
//               <li>
//                 <Link href="#">Careers</Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-xl font-serif mb-4">Connect With Us</h3>
//             <div className="flex space-x-4 mb-4">
//               <SocialIcon icon="facebook" />
//               <SocialIcon icon="instagram" />
//               <SocialIcon icon="twitter" />
//               <SocialIcon icon="linkedin" />
//             </div>
//             <div className="text-sm space-y-1">
//               <p>Email: contact@dinero.com</p>
//               <p>Phone: +38712345678</p>
//               <p>Address: Hrasnicka cesta 15, Ilidza 71210</p>
//             </div>
//             <div className="flex space-x-4 mt-4">
//               <Image
//                 src="/placeholder.svg?height=40&width=120"
//                 alt="Google Play"
//                 width={120}
//                 height={40}
//               />
//               <Image
//                 src="/placeholder.svg?height=40&width=120"
//                 alt="App Store"
//                 width={120}
//                 height={40}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-gray-700 text-sm text-center">
//           © 2025 Dinero. All rights reserved.
//         </div>
//       </footer>
//     </main>
//   );
// }

// function CategoryButton({ label, count, color }) {
//   return (
//     <button className={`${color} text-white rounded-2xl py-3 px-6 min-w-[150px]`}>
//       <div className="text-center">
//         <div className="text-xl font-serif">{label}</div>
//         <div className="text-sm">{count} Places</div>
//       </div>
//     </button>
//   );
// }

// function RestaurantCard({ name, description, color }) {
//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-md">
//       <div className="h-48 relative">
//         <Image
//           src="/placeholder.svg?height=200&width=300"
//           alt={name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="p-4 text-center">
//         <h3 className="text-xl font-serif">{name}</h3>
//         <p className="text-sm text-gray-600 mt-1">{description}</p>
//       </div>
//       <div className="flex justify-center pb-4">
//         <button className={`${color} text-white px-4 py-2 rounded-full text-sm`}>Book now</button>
//       </div>
//     </div>
//   );
// }

// function ProcessStep({ imageSrc, description }) {
//   return (
//     <div className="flex flex-col items-center text-center">
//       <div className="mb-4">
//         <Image
//           src={imageSrc || '/placeholder.svg'}
//           alt="Process step"
//           width={100}
//           height={100}
//           className="opacity-80"
//         />
//       </div>
//       <p className="text-sm">{description}</p>
//     </div>
//   );
// }

// function SocialIcon({ icon }) {
//   return (
//     <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
//       <span className="text-[#2a3b22] text-xs">{icon.charAt(0).toUpperCase()}</span>
//     </div>
//   );
// }

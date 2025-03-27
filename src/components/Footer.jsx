import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#283618]">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/about" className="text-base text-white hover:text-gray-500">
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/restaurants" className="text-base text-white hover:text-gray-500">
              Restaurants
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/cuisines" className="text-base text-white hover:text-gray-500">
              Cuisines
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/contact" className="text-base text-white hover:text-gray-500">
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy" className="text-base text-white hover:text-gray-500">
              Privacy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/terms" className="text-base text-white hover:text-gray-500">
              Terms
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FaFacebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-white">
          &copy; {new Date().getFullYear()} Dinero, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

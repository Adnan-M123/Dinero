import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className="bg-[#4A503D] text-white py-10">
      <div className="flex justify-around">
        <div>
          <h4 className="font-bold">Website</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Newsletter</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Help</li>
            <li>FAQs</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Connect With Us</h4>
          <div>
            <div className="social-media space-x-4 flex items-center mt-1 mb-1">
              {[
                { href: 'https://www.facebook.com', icon: <FaFacebookF className="text-2xl" /> },
                { href: 'https://www.instagram.com', icon: <FaInstagram className="text-2xl" /> },
                { href: 'https://www.x.com', icon: <RiTwitterXFill className="text-2xl" /> },
                { href: 'https://www.linkedin.com', icon: <FaLinkedinIn className="text-2xl" /> },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#e8f0f7] hover:bg-[#4A503D] hover:bg-opacity-75 text-[#2C3E53] hover:text-white transition-all duration-200 ease-in-out`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <ul>
            <li>Email: contact@dinero.com</li>
            <li>Phone: +387123456789</li>
            <li>Address: Hrasnička cesta 15, Ilidža 71210</li>
          </ul>
        </div>
      </div>
      <div className="download-copyright space-y-2 pt-6 text-right pr-10">
        <div className="download-buttons flex space-x-4 justify-end">
          <a href="https://apps.apple.com" target="_blank">
            <img src="/app-store.jpg" alt="AppStore" className="w-auto h-7 rounded" />
          </a>
          <a href="https://play.google.com/store" target="_blank">
            <img src="/google-play.jpg" alt="GooglePlay" className="w-auto h-7 rounded" />
          </a>
        </div>

        <div className="copyright pt-3">
          <p className="text-[12px] text-[#e8f0f7]">&copy; 2024 IUS Mahala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

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
          <ul>
            <li>Email: contact@diner.com</li>
            <li>Phone: +387123456789</li>
            <li>Address: Hrasnička cesta 15, Ilidža 71210</li>
          </ul>
        </div>
      </div>
      <div className="text-right mt-6 pr-5">© 2025 Dinero. All rights reserved.</div>
    </footer>
  );
}

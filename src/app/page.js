import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <header className="hero-section">
          <h1>Welcome to Our Website</h1>
          <p>Your go-to place for amazing content and features.</p>
        </header>
        <section className="about-section">
          <h2>About Us</h2>
          <p>We are dedicated to providing the best user experience with high-quality content and services. Our team works tirelessly to bring you the latest trends and news from around the world.</p>
        </section>
        <section className="features-section">
          <h2>Our Features</h2>
          <ul>
            <li>Feature 1: Responsive design</li>
            <li>Feature 2: Real-time updates</li>
            <li>Feature 3: Easy navigation</li>
            <li>Feature 4: Customizable settings</li>
          </ul>
        </section>
        <section className="gallery-section">
          <h2>Our Gallery</h2>
          <div className="gallery">
            <img src="https://via.placeholder.com/300" alt="Placeholder Image 1" />
            <img src="https://via.placeholder.com/300" alt="Placeholder Image 2" />
            <img src="https://via.placeholder.com/300" alt="Placeholder Image 3" />
          </div>
        </section>
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>Have any questions? Reach out to us anytime!</p>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </>
  );
}

import React from "react";
import Navbar from "../components/Navbar";

function Contact() {
return (
<>

<Navbar />

<section className="hero">

<div className="projects">

<div className="card">
<h3>Name</h3>
<p>Jeya Surya</p>
</div>

<div className="card">
<h3>Phone</h3>
<p>9360017080</p>
</div>

<div className="card">
<h3>Email</h3>
<p>smartsurya6556@gmail.com</p>
</div>

<div className="card">
<h3>Location</h3>
<p>Chennai</p>
</div>

<div className="card">
<h3>Naukri</h3>
<a href="https://www.naukri.com/mnjuser/homepage" target="_blank" rel="noreferrer">
View Profile
</a>
</div>

</div>

<a href="/SURYA.Resume.pdf" className="btn-download">
Preview Resume
</a>

</section>

<div className="contact-card">

<h2>Send Message</h2>

<form>

<input type="text" placeholder="Your Name" required />
<input type="email" placeholder="Your Email" required />
<textarea placeholder="Your Message" required></textarea>

<button className="btn-send">Send</button>

</form>

</div>

<div id="fx"></div>

</>
);
}

export default Contact;
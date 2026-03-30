import React from "react";
import Navbar from "../components/Navbar";

function Home() {
return (
<>

<Navbar />

<section className="hero">

<h1>Hi I'm Surya</h1>

<div className="card">
<div id="typing" className="typing"></div>
</div>

<div className="intro-box">
<h2>Who I Am</h2>
<p>
A full-stack developer with a problem-solving mindset,
I learn fast and build scalable solutions.
</p>
</div>

<a 
href="/SURYA.Resume.pdf" 
download="Surya-Resume.pdf"
className="btn-download"
>
⬇ Download Resume
</a>

</section>

<div id="fx"></div>

</>
);
}

export default Home;
import React from "react";
import Navbar from "../components/Navbar";

function About() {
return (
<>

<Navbar />

<section className="about">

<h1>About Me</h1>

<div className="about-box">
<p>
I'm Surya, a passionate full-stack developer who builds
clean and scalable applications.
</p>
</div>

<h2>Skills</h2>

<div className="skills">
<div className="card">Java</div>
<div className="card">Python</div>
<div className="card">JavaScript</div>
<div className="card">HTML</div>
<div className="card">CSS</div>
<div className="card">Git</div>
</div>

<h2>Strength</h2>

<div className="about-box">
<p>✔ Fast Learner</p>
<p>✔ Problem Solver</p>
<p>✔ Clean Code</p>
<p>✔ Team Player</p>
</div>

</section>

<div id="fx"></div>

</>
);
}

export default About;
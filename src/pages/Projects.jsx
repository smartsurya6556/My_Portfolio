import React from "react";
import Navbar from "../components/Navbar";

function Projects() {
return (
<>

<Navbar />

<h1 className="title">My Projects</h1>

<div className="projects">

<div className="card">
<h2>🌐 Web Project</h2>
<h3>Portfolio Website</h3>
<p>Responsive personal portfolio with modern UI and animations.</p>
<button>View</button>
</div>

<div className="card">
<h2>⚙️ Backend Project</h2>
<h3>Django App</h3>
<p>Simple web app with backend logic and database integration.</p>
<button>View</button>
</div>

<div className="card">
<h2>💻 Java Project</h2>
<h3>Billing System</h3>
<p>Basic system to manage billing and invoice data.</p>
<button>View</button>
</div>

</div>

<div id="fx"></div>

</>
);
}

export default Projects;
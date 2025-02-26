import React from "react";
import "./Contact.css"; // Подключаем стили

const teamMembers = [
  { name: "Grigorii", role: "Project Manager, Full-Stack Developer", email: "grigorii@merntravel.com" },
  { name: "Ilia", role: "Full-Stack Developer", email: "ilia@merntravel.com" },
  { name: "Purity", role: "Full-Stack Developer", email: "purity@merntravel.com" },
  { name: "Jenni", role: "Full-Stack Developer", email: "jenni@merntravel.com" },
  { name: "Mikhey", role: "Full-Stack Developer", email: "mikhey@example.com" },
];

const Contact = () => {
  return (
    <div className="contact-container">
       {/* Travel icons */}
       <div className="travel-icons">
        ✈️ 🌍 🗺️ 📸
      </div>
      <h1>Contact Us</h1>
      <p>Thank you for visiting our site!</p>
      <p>Feel free to reach out via email or social media.</p>

      <h2>Meet Our Team</h2>
      <div className="team-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <h3>{member.name}</h3>
            <p><strong>role:</strong> {member.role}</p>
            <p>
              <strong>e-mail:</strong>{" "}
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </p>
          </div>
        ))}
      </div>

      <div className="team-description-box">
        🌍 "We don't just code — we code dreams and turn them into routes! This site is our first big flight, and we invite you to join it!"
      </div>
    </div>
  );
};

export default Contact;
import React from "react";
import "./Contact.css"; // Подключаем стили

const teamMembers = [
  { name: "Grigoriy", role: "Project Manager, Full-Stack Developer", email: "grigoryi@merntravel.com" },
  { name: "Ilya", role: "Full-Stack Developer", email: "ilya@merntravel.com" },
  { name: "Purity", role: "Full-Stack Developer", email: "purity@merntravel.com" },
  { name: "Jenni", role: "Full-Stack Developer", email: "jenni@merntravel.com" },
  { name: "Mickey", role: "Full-Stack Developer", email: "mickey@example.com" },
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

/*
import React from "react";

const teamMembers = [
  { name: "Alice Johnson", role: "Frontend Developer", email: "alice@example.com" },
  { name: "Bob Smith", role: "Backend Developer", email: "bob@example.com" },
  { name: "Charlie Brown", role: "UI/UX Designer", email: "charlie@example.com" },
  { name: "Diana Green", role: "Project Manager", email: "diana@example.com" },
  { name: "Ethan White", role: "DevOps Engineer", email: "ethan@example.com" },
];

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Thank you for visiting our site!</p>
      <p>Feel free to reach out via email or social media.</p>

      <h2>Meet Our Team</h2>
      <div className="team-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <h3>{member.name}</h3>
            <p><strong>Role:</strong> {member.role}</p>
            <p><strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a></p>
          </div>
        ))}
      </div>

      <p className="team-description">
        🌍 "We don't just code — we code dreams and turn them into routes!
        This site is our first big flight, and we invite you to join it!"
      </p>

      <style jsx>{`
      
        .contact-container {
          text-align: center;
          padding: 20px;
        }
        .team-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .team-member {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 250px;
        }
        .team-member h3 {
          margin: 5px 0;
        }
        .team-member a {
          text-decoration: none;
          color: #007bff;
        }
        .team-description {
          margin-top: 20px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Contact;

*/
import React from "react";
import "./OurTeam.css";

const teamMembers = [
  {
    name: "Grigoriy",
    role: "The Idea Generator & Inspiration Seeker 🚀",
    description:
      "Always has a ticket to somewhere unknown in their pocket. Loves discovering unique routes you won’t find in a typical travel guide.",
    favoritePlace: "📍 Favorite place: 🏙️ The buzzing streets of big cities that never sleep.",
    image: "client/react/src/assets/images/grigoriy.jpg", // Добавь фото в папку public/images/
  },
  {
    name: "Ilya",
    role: "The Coder, Digital Map Wizard 💻 & Planning Master 📊",
    description:
      "Turns chaotic ideas into clean, user-friendly code. If travel could be programmed, he would have already built the perfect algorithm for every trip.",
    favoritePlace:
      "📍 Favorite place: ⛰️ The mountains, where the internet barely works, but the stars shine brightest.",
      image: "/images/ilya.jpg",
  },
  {
    name: "Purity",
    role: "The Storyteller & Memory Keeper 📸",
    description:
      "Travel isn’t just about places – it’s about the stories they leave behind. Loves capturing moments, writing notes, and finding beauty in the details.",
    favoritePlace: "📍 Favorite place: ☕ A cozy café overlooking a lively square, watching the world go by.",
    image: "/images/purity.jpg",
  },
  {
    name: "Jenni",
    role: "The Logistics Master & Comfort Explorer ✈️",
    description:
      "Loves the perfect balance between spontaneity and comfort. Can embark on a last-minute trip but always knows where to stay and how to get there.",
    favoritePlace:
      "📍 Favorite place: 🌊 The coastline, working on a laptop while listening to the waves in the evening.",
      image: "/images/jenni.jpg",
  },
  {
    name: "Mickey",
    role: "The Adventure Seeker 🎒 & The Visual Storyteller 📸",
    description:
      "Seeks to capture the soul of every destination through a lens. People, streets, emotions – all come to life in their photos.",
    favoritePlace: "📍 Favorite place: 🏘️ Narrow streets full of surprises at every turn.",
    image: "/assets/images/mickey.jpg",
  },
];

const OurTeam = () => {
  return (
    <div className="team-container">
      {/* Travel icons */}
      <div className="travel-icons">
        ✈️ 🌍 🗺️ 📸
      </div>

      {/* Заголовок */}
      <h1 className="team-title">Meet Our Team</h1>
      <p className="team-description">
        🌍 We are a team of enthusiasts brought together by our passion for travel and technology! 🚀
        We love unconventional routes, hidden gems, and unique experiences that make each trip unforgettable.. 
        🚀 Once, we lived in different countries, but fate (and a thirst for adventure) led us to the same city, 
        where we not only became close like-minded people, but also created our own travel agency. 
        Now, it's time to reveal the faces behind it – meet our team!
      </p>

      

      {/* Cards */}
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            {/* Profile photo */}
            <img src={member.image} alt={member.name} className="team-member-photo" />
            <h2 className="team-member-name">{member.name}</h2>
            <h3 className="team-member-role">{member.role}</h3>
            <p className="team-member-description">{member.description}</p>
            <p className="team-member-place">{member.favoritePlace}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { OurTeam };

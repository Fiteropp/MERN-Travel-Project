import React from "react";
export function ClientsContainer({
  client
}) {
  return <div className=" client_container">
        <h2 className="section_header">What our clients say</h2>
        <div className="client_grid">
          <div className="client_card">
            <img className="client-img" src={client} alt="client" />
            <p>
              The booking process was seamless, and the confirmation was
              instant. I highly recommend Mern Hotel Booking for hassle-free
              hotel bookings.
            </p>
          </div>
          <div className="client_card">
            <img className="client-img" src={client} alt="client" />
            <p>
              The website provided detailed information about hotel, including
              amenities, photos, which helped me make an informed decision.
            </p>
          </div>
          <div className="client_card">
            <img className="client-img" src={client} alt="client" />
            <p>
              I was able to book a room within minutes, and the hotel exceeded
              my expectations. I appreciate Mern Hotel Booking efficiency and
              reliability.
            </p>
          </div>
        </div>
      </div>;
}
  
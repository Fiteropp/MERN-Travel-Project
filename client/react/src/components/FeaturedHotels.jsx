import hotel from "../assets/images/hotel.jpg";
const FeaturedHotels = () => {
  return (
    <section className="section_container popular_container">
      <h2 className="section_header">Popular Hotels</h2>
      <div className="popular_grid">
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Hotel Kämp</h4>
              <h4>280 euro</h4>
            </div>
            <p>Helsinki, Finland</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Marriot</h4>
              <h4>657 euro</h4>
            </div>
            <p>Frankfurt, Germany</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>The Ritz London</h4>
              <h4>1,010 pounds</h4>
            </div>
            <p>London, UK</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Hotel Splendide Royal Lugano</h4>
              <h4>315 euros</h4>
            </div>
            <p>Lugano, Switzerland</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Hotel Splendide Royal Lugano</h4>
              <h4>315 euros</h4>
            </div>
            <p>Lugano, Switzerland</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Atlantis, The Palm</h4>
              <h4>586 euros</h4>
            </div>
            <p>The Palm Jumeirah, Dubai</p>
          </div>
        </div>
        <div className="popular_card">
          <img src={hotel} alt="hotel" />
          <div className="popular_content">
            <div className="popular_card_header">
              <h4>Victoria Falls River Lodge</h4>
              <h4>1317 euros</h4>
            </div>
            <p>Victoria Falls, Zimbabwe</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export { FeaturedHotels };

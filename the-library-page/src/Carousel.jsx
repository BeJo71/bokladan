function Carousel() {
  return (
    <div id="bookCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#bookCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#bookCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#bookCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/bok4.jpg" className="d-block w-100" alt="Bok 1" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Välkommen till Bokladan!</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/bok2.jpg" className="d-block w-100" alt="Bok 2" />
          <div class="carousel-caption d-non d-md block">
            <h5>Läs om mängder av böcker</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/bok3.jpg" className="d-block w-100" alt="Bok 3" />
          <div class="carousel-caption d-non d-md block">
            <h5>Upptäck och spara dina favoritböcker</h5>
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Föregående</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Nästa</span>
      </button>
    </div>
  );
}

// länk till vart jag hämtade ideer och kod
// till karusellen : https://react-bootstrap.netlify.app/docs/components/carousel/

export default Carousel;

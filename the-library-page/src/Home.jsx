import { useState, useEffect } from "react";
import Carousel from "./Carousel";

function Home() {
  return (
    <div>
      <h1 className="fade-in-text fade-delay-1">Välkommen till BokLadan</h1>
      <Carousel />
    </div>
  );
}

export default Home;
/*Bara en vanlig första sida, karusell och design med hjälp av Bootstrap*/

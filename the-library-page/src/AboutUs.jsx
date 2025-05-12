function AboutUs() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="fade-in-text fade-delay-1">Om oss</h1>
      <p lead className="fade-in-text fade-delay-2">
        Vi på <strong>Bokladan</strong> brinner för läsning och att ge dig en
        plats där du kan samla, utforska och bevara dina bokskatter. Sidan är
        skapad med kärlek till litteraturen för dig som älskar böcker.
      </p>
      <p className="fade-in-text fade-delay-2">
        Vi vill erbjuda en enkel, trygg och personlig plats där du kan
        organisera ditt bibliotek, spara favoriter och hitta ny inspiration.
      </p>

      <img
        src="/images/bok8.jpg"
        alt="Bokladan"
        className="img-fluid rounded shadow mt-4 animated-image"
        style={{ maxWidth: "400px" }}
      />

      <div className="mt-5">
        <h2 className="fade-in-text fade-delay-1">Kontakt</h2>
        <p className="fade-in-text fade-delay-2">
          Har du frågor, synpunkter eller idéer? Tveka inte att höra av dig!
        </p>
        <p>
          Du når oss på:&nbsp;
          <a href="mailto:beeajohansson@hotmail.se">beeajohansson@hotmail.se</a>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
/* En enkel "Om oss"-sida */

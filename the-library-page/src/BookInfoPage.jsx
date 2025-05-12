import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function BookInfoPage() {
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("searchTerm") || ""
  );
  const [results, setResults] = useState(
    JSON.parse(sessionStorage.getItem("results")) || []
  );

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.sub;
  }

  // Rensa tidigare sökning om användaren loggat in efter att ha sökt utloggad
  useEffect(() => {
    const previousSearch = sessionStorage.getItem("searchTerm");
    const searchOwner = sessionStorage.getItem("userSearchOwner");

    if (token) {
      if (previousSearch && !searchOwner) {
        // Sökning fanns men ingen ägare – användaren har just loggat in
        sessionStorage.removeItem("searchTerm");
        sessionStorage.removeItem("results");
        setSearchTerm("");
        setResults([]);
      }
      // Markera att detta är sökning för aktuell användare
      sessionStorage.setItem("userSearchOwner", userId);
    } else {
      // Inte inloggad – ta bort ägarinfo
      sessionStorage.removeItem("userSearchOwner");
    }
  }, [token]);

  const handleSearch = () => {
    if (!searchTerm) return;

    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        const topResults = data.docs.slice(0, 100);
        setResults(topResults);
        sessionStorage.setItem("searchTerm", searchTerm);
        sessionStorage.setItem("results", JSON.stringify(topResults));
        if (userId) {
          sessionStorage.setItem("userSearchOwner", userId);
        }
      })
      .catch((err) => console.error("Fel vid hämtning:", err));
  };

  const getShortDescription = (book) => {
    if (book.first_sentence && Array.isArray(book.first_sentence)) {
      return book.first_sentence[0].length > 200
        ? book.first_sentence[0].substring(0, 200) + "..."
        : book.first_sentence[0];
    } else {
      return "Beskrivning finns i detaljvyn.";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fade-in-text fade-delay-1">Sök bokinformation</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Sök titel eller författare"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Sök
        </button>
      </div>

      {results.length === 0 && (
        <div className="text-center mt-4 animated-image">
          <img
            src="/images/bok7.jpg"
            alt="Bokillustration"
            style={{ maxWidth: "400px", width: "100%" }}
          />
          <p className="mt-2">Sök efter en bok för att komma igång!</p>
        </div>
      )}

      <div className="row">
        {results.map((book, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card h-100">
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/bookdetails/${encodeURIComponent(book.key)}`}>
                    {book.title}
                  </Link>
                </h5>
                <p className="card-text">
                  <strong>Författare:</strong>{" "}
                  {book.author_name ? book.author_name[0] : "Okänd författare"}
                </p>
                <p className="card-text">
                  <strong>Beskrivning:</strong> {getShortDescription(book)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookInfoPage;

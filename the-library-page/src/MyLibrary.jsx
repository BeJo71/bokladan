import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function MyLibrary() {
  /* För att veta vilka böcker som tillhör användaren  
  Dekodar tokenen
  Hämtar JWT-token från localStorage */
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.sub;
  }

  useEffect(() => {
    /*  hämta böcker som tillhör inloggad användare.
     Skickar en GET-förfrågan till backend 
    Resultatet sparas i books via setBooks */

    if (token) {
      fetch("http://localhost:5292/api/Book/mybooks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Fel vid hämtning av böcker");
          return res.json();
        })
        .then((data) => setBooks(data))
        .catch((err) => console.error("Fel vid hämtning av böcker:", err));
    }
  }, [token]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5292/api/Book/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fel vid borttagning");
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((err) => console.error("Fel vid borttagning:", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="fade-in-text fade-delay-1">Mitt bibliotek</h2>

      {books.length === 0 ? (
        <p className="fade-in-text fade-delay-2">Du har inga sparade böcker.</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-3" key={book.id}>
              <div className="card h-100">
                {book.coverId && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/savedbookdetails/${book.id}`}>
                      {book.title}
                    </Link>
                  </h5>
                  <p className="card-text">
                    <strong>Författare:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    {book.description
                      ? book.description.length > 50
                        ? book.description.substring(0, 50) + "..."
                        : book.description
                      : "Ingen beskrivning."}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(book.id)}
                  >
                    Ta bort
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/savedbookdetails/${book.id}`)}
                  >
                    Läs mer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate("/mypage")}
      >
        Tillbaka till Min sida
      </button>
    </div>
  );
}

export default MyLibrary;

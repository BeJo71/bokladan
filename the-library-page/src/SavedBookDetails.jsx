import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SavedBookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5292/api/Book/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Fel vid hämtning av bokdetaljer:", err));
  }, [id, token]);

  if (!book) return <p>Laddar bokdetaljer...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>{book.title}</h2>

      {book.coverId ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
          alt={book.title}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      ) : (
        <p>Ingen omslagsbild tillgänglig.</p>
      )}

      <p>
        <strong>Författare:</strong>{" "}
        {book.author ? book.author : "Okänd författare"}
      </p>
      <p>
        <strong>Beskrivning:</strong>{" "}
        {book.description && book.description.trim() !== ""
          ? book.description
          : "Ingen beskrivning sparad."}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre || "Okänt"}
      </p>
      <p>
        <strong>Första publiceringsår:</strong>{" "}
        {book.publishYear ? book.publishYear : "Okänt"}
      </p>

      <button onClick={() => navigate(-1)}>Tillbaka</button>
    </div>
  );
}

export default SavedBookDetails;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function BookDetails() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [authorName, setAuthorName] = useState("Okänd författare");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.sub;
  }

  // Hämta bokdetaljer
  useEffect(() => {
    fetch(`https://openlibrary.org${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setBookDetails(data);

        //  Hämta författare
        if (data.authors && data.authors.length > 0) {
          const authorKey = data.authors[0]?.author?.key; // t.ex. /authors/OL23919A
          if (authorKey) {
            fetch(`https://openlibrary.org${authorKey}.json`)
              .then((res) => res.json())
              .then((authorData) => {
                setAuthorName(authorData.name || "Okänd författare");
              })
              .catch(() => {
                setAuthorName("Okänd författare");
              });
          }
        }
      })
      .catch((err) => console.error("Fel vid hämtning av bokdetaljer:", err));
  }, [id]);

  const handleSaveBook = () => {
    if (!userId) {
      alert("Du måste vara inloggad för att spara böcker.");
      return;
    }

    const descriptionText = bookDetails?.description
      ? typeof bookDetails.description === "string"
        ? bookDetails.description
        : bookDetails.description.value
      : "Ingen beskrivning tillgänglig.";

    // hämta publiceingsår
    let publishYear = null;
    if (bookDetails?.first_publish_date) {
      const yearMatch = bookDetails.first_publish_date.match(/\d{4}/);
      if (yearMatch) {
        publishYear = yearMatch[0];
      }
    } else if (bookDetails?.created?.value) {
      const yearMatch = bookDetails.created.value.match(/\d{4}/);
      if (yearMatch) {
        publishYear = yearMatch[0];
      }
    }

    const newBook = {
      title: bookDetails.title || "Okänd titel",
      author: authorName,
      genre: "Okänt",
      description: descriptionText,
      coverId:
        bookDetails.covers && bookDetails.covers.length > 0
          ? bookDetails.covers[0]
          : null,
      publishYear: publishYear,
    };

    console.log("[DEBUG] Sparar bok:", newBook);

    fetch("http://localhost:5292/api/Book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => {
        if (res.ok) {
          alert("Boken sparad i ditt bibliotek!");
        } else {
          throw new Error("Kunde inte spara boken.");
        }
      })
      .catch((err) => console.error("Fel vid sparande:", err));
  };

  if (!bookDetails) return <p>Laddar bokdetaljer...</p>;

  const descriptionText = bookDetails?.description
    ? typeof bookDetails.description === "string"
      ? bookDetails.description
      : bookDetails.description.value
    : "Ingen beskrivning tillgänglig.";

  let publishYear = null;
  if (bookDetails?.first_publish_date) {
    const yearMatch = bookDetails.first_publish_date.match(/\d{4}/);
    if (yearMatch) {
      publishYear = yearMatch[0];
    }
  } else if (bookDetails?.created?.value) {
    const yearMatch = bookDetails.created.value.match(/\d{4}/);
    if (yearMatch) {
      publishYear = yearMatch[0];
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>{bookDetails.title}</h2>

      {bookDetails.covers && bookDetails.covers.length > 0 ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`}
          alt={bookDetails.title}
          style={{ width: "300px", marginBottom: "20px" }}
        />
      ) : (
        <p>Ingen bild tillgänglig.</p>
      )}

      <p>
        <strong>Författare:</strong> {authorName}
      </p>

      <p>
        <strong>Beskrivning:</strong>{" "}
        {descriptionText.length > 400
          ? descriptionText.substring(0, 400) + "..."
          : descriptionText}
      </p>

      <p>
        <strong>Första publicerad:</strong>{" "}
        {publishYear ? publishYear : "Okänd"}
      </p>

      {token && (
        <button onClick={handleSaveBook}>Spara i mitt bibliotek</button>
      )}

      <button onClick={() => navigate(-1)}>Tillbaka</button>
    </div>
  );
}

export default BookDetails;

import { Link } from "react-router-dom";

function SavedBookItem({ book }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "10px",
        maxWidth: "300px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4>
        <Link
          to={`/savedbookdetails/${book.id}`}
          style={{ textDecoration: "none", color: "#333" }}
        >
          {book.title}
        </Link>
      </h4>
      <p>
        <strong>Författare:</strong> {book.author || "Okänd"}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre || "Okänt"}
      </p>
      <p>
        {book.description
          ? book.description.length > 50
            ? book.description.substring(0, 50) + "..."
            : book.description
          : "Ingen beskrivning."}
      </p>
    </div>
  );
}

export default SavedBookItem;

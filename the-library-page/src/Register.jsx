import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Registrerar...");

    fetch("http://localhost:5247/api/User/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Användare skapad! Du kan nu logga in.");
        } else {
          res.json().then((data) => {
            // felmeddelanden
            if (data && data.errors) {
              const errorMessages = Object.values(data.errors).join(" ");
              setMessage(" Fel: " + errorMessages);
            } else if (data && data.message) {
              setMessage(" Fel: " + data.message);
            } else {
              setMessage("Något gick fel. Kontrollera dina uppgifter.");
            }
          });
        }
      })
      .catch((err) => {
        console.error("Fel vid registrering:", err);
        setMessage(" Ett oväntat fel inträffade vid registreringen.");
      });
  };

  return (
    <div>
      <h2>Registrera konto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="userName"
            placeholder="Användarnamn"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <br />
          <small>Välj ett unikt användarnamn (minst 3 tecken).</small>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="E-post"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <small> Fyll i din e-postadress, t.ex. namn@example.com</small>
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <small>
            Minst 6 tecken. Minst en stor bokstav, en liten bokstav, ett
            specialtecken och en siffra.
          </small>
        </div>

        <br />
        <button type="submit">Registrera</button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Register;

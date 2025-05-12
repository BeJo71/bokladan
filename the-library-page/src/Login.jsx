import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5247/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Fel e-post eller lösenord.");
        }
      })
      .then((data) => {
        // Spara token i localStorage
        localStorage.setItem("token", data.token);
        setMessage("Inloggad!");
        navigate("/mypage"); // Skicka användaren till Min sida
      })
      .catch((err) => {
        console.error("Fel vid inloggning:", err);
        setMessage("Fel: " + err.message);
      });
  };

  return (
    <div>
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
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
          <small>Fyll i din epost</small>
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
          <small>Fyll i ditt lösenord</small>
        </div>
        <button type="submit">Logga in</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function EditProfile() {
  const [profile, setProfile] = useState({ userName: "", email: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const token =
    localStorage.getItem(
      "token"
    ); /* JWT-token som behövs för att identifiera användaren */
  const navigate = useNavigate();

  useEffect(() => {
    /* Hämta användarprofilen, bearer skickas med för att identifiera användaren */
    if (!token) return;
    fetch("http://localhost:5247/api/User/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) =>
        setProfile({ userName: data.userName, email: data.email })
      )
      .catch((err) => console.error("Fel vid hämtning av profil:", err));
  }, [token]);

  const handleProfileChange = (e) => {
    /*Hantera uppdatering av profil  */
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordsChange = (e) => {
    /*Hantera uppdatering av lösenord  */
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = () => {
    /* Skicka en PUT-förfrågan med uppdaterad profilinfo. */
    fetch("http://localhost:5247/api/User/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Profilen uppdaterad!");
        } else {
          setMessage("Misslyckades med att uppdatera profilen.");
        }
      })
      .catch(() => setMessage("Något gick fel vid uppdatering."));
  };

  const changePassword = () => {
    /* Skickar nuvarande och nytt lösenord till API:t */
    fetch("http://localhost:5247/api/User/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(passwords),
    })
      .then((res) => {
        /* Tömmer lösenordsfält och visar ett meddelande vid lyckat byte */
        if (res.ok) {
          setMessage("Lösenordet har ändrats!");
          setPasswords({ currentPassword: "", newPassword: "" });
        } else {
          setMessage("Misslyckades med att byta lösenord.");
        }
      })
      .catch(() => setMessage("Fel vid lösenordsbyte."));
  };

  const deleteAccount = () => {
    /*  Bekräftelsepopup ska visas innan kontot raderas*/
    if (
      !window.confirm(
        "Är du säker på att du vill radera ditt konto? Detta kan inte ångras."
      )
    )
      return;

    fetch("http://localhost:5247/api/User/delete", {
      /* Om borttagningen lyckas: ska token tas bort och användaren skickas till startsidan */
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setMessage("Kunde inte ta bort kontot.");
        }
      })
      .catch(() => setMessage("Fel vid borttagning av konto."));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Redigera Profil</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Uppdatera användarnamn och e-post</h5>
          <input
            name="userName"
            className="form-control mb-2"
            value={profile.userName}
            onChange={handleProfileChange}
            placeholder="Användarnamn"
          />
          <input
            name="email"
            type="email"
            className="form-control mb-2"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="E-post"
          />
          <button onClick={updateProfile} className="btn btn-primary">
            Uppdatera profil
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Byt lösenord</h5>
          <input
            type="password"
            name="currentPassword"
            className="form-control mb-2"
            placeholder="Nuvarande lösenord"
            value={passwords.currentPassword}
            onChange={handlePasswordsChange}
          />
          <input
            type="password"
            name="newPassword"
            className="form-control mb-2"
            placeholder="Nytt lösenord"
            value={passwords.newPassword}
            onChange={handlePasswordsChange}
          />
          <button onClick={changePassword} className="btn btn-primary">
            Byt lösenord
          </button>
        </div>
      </div>

      <div className="card mb-4 border-danger">
        <div className="card-body">
          <h5 className="card-title text-danger">Ta bort konto</h5>
          <button onClick={deleteAccount} className="btn btn-danger">
            Radera konto permanent
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/mypage")}
          className="btn btn-secondary"
        >
          Tillbaka till Min sida
        </button>
      </div>
    </div>
  );
}

export default EditProfile;

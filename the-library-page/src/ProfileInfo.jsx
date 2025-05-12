import { Link } from "react-router-dom";

function ProfileInfo({ profile }) {
  if (!profile) {
    return <p className="text-center">Hämtar profilinformation...</p>;
  }

  return (
    <div className="card mb-4" style={{ maxWidth: "400px", margin: "auto" }}>
      <div className="card-body">
        <h5 className="card-title">Profil</h5>
        <p className="card-text">
          <strong>Användarnamn:</strong> {profile.userName}
        </p>
        <p className="card-text">
          <strong>E-post:</strong> {profile.email}
        </p>
        <Link to="/editprofile" className="btn btn-outline-primary">
          Redigera profil
        </Link>
      </div>
    </div>
  );
}

export default ProfileInfo;

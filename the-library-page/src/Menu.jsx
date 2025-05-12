import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Menu() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("searchTerm");
    sessionStorage.removeItem("results");
    sessionStorage.removeItem("userSearchOwner");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Bokladan
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Start
              </NavLink>
            </li>
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/mypage">
                  Min sida
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutus">
                Om oss
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bokinfopage">
                Sök bokinfo
              </NavLink>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Registrera
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Logga in
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logga ut
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;

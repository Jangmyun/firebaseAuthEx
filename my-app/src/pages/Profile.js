import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/profile", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.userId);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch profile: ", error);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "localhost:3001/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>User Id: {user}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Profile;

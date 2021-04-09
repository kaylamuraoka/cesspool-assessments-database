import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });

          setIsLoggedIn(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setUser(res.data);
        } catch (err) {
          console.log(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
  };
}

export default UserAPI;

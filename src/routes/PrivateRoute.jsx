import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null); // not true or false
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user); // true if user exists
      setLoading(false);   // Firebase has finished checking
    });
    return unsub;
  }, []);

  //  VERY IMPORTANT: while Firebase is checking,
  // do NOT redirect. Just show "loading"
  if (loading) {
    return (
      <div className="text-center text-xl p-10">Loading...</div>
    );
  }

  // After checking → show page or redirect
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

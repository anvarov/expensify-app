import { firebase, googleAuthProvider } from "../firebase/firebase";

export const startLogin = () => {
  return () => {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((data) => {
        return data;
      });
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

export const logout = () => ({ type: "LOGOUT" });

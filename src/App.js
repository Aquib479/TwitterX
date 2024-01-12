import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Users from "./pages/Users";
import Profile from "./pages/profile/Profile";
import Header from "./components/Header";
import { AuthProvider } from "./context/userContext";
import PrivateRoute from "./components/privateRoute";
import Followers from "./pages/profile/Followers";
import Posts from "./pages/profile/Posts";
import Following from "./pages/profile/Following";

function App() {
  return (
    <>
      <div className="main">
        <AuthProvider>
          <Header />
        </AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route path="/register" element={<SignUp />} />

          <Route
            path="/feed"
            element={
              <AuthProvider>
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/users"
            element={
              <AuthProvider>
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthProvider>
                <Profile />
              </AuthProvider>
            }
          >
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Posts/>
                </PrivateRoute>
              }
            />
            <Route
              path="followings"
              element={
                <PrivateRoute>
                  <Following />
                </PrivateRoute>
              }
            />
            <Route
              path="followers"
              element={
                <PrivateRoute>
                  <Followers />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

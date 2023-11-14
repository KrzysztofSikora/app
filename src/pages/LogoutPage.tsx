import {removeUserCredentials} from "../services/AuthService";
import {Navigate, useNavigate} from "react-router-dom";
import React from "react";

export default function LogoutPage() {
  const navigate = useNavigate()
  removeUserCredentials()
  return <Navigate to="/login" replace />
}

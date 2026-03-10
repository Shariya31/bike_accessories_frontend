"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Google Client ID missing");
  }

  return (
    <GoogleOAuthProvider clientId={clientId} key={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
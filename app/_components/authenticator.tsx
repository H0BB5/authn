"use client";

import { useEffect } from "react";
import {
  authenticate,
  createCredential,
  handleRegistration,
} from "./startRegistration";

function checkUserRegistered() {
  if (localStorage.getItem("credentialId") !== null) {
    return localStorage.getItem("credentialId");
  }
}

export async function Authenticator() {
  const checkAuth = async () => {
    if (checkUserRegistered()) {
      console.log("Credential already exists");
      try {
        // Trigger the authentication process
        await authenticate();
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    } else {
      console.log("No existing credential, creating new one");
      try {
        const credential = await createCredential();
        if (credential) {
          handleRegistration(credential);
          console.log("New credential created");
        } else {
          console.log("Credential creation was unsuccessful");
        }
      } catch (error) {
        console.error("Error during credential creation:", error);
        // Handle errors appropriately
      }
    }
  };

  return (
    <div>
      <button onClick={checkAuth}>Register</button>
    </div>
  );
}

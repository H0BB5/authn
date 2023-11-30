export async function createCredential() {
  try {
    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: new Uint8Array([
        ...window.crypto.getRandomValues(new Uint8Array(32)),
      ]),
      authenticatorSelection: {
        authenticatorAttachment: "platform",
      },
      rp: { name: "Example Corp" },
      user: {
        id: new Uint8Array(16),
        name: "dylanjhobbs@gmail.com",
        displayName: "Dylan Hobbs",
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },
        { alg: -257, type: "public-key" },
      ],
    };

    const credential = await navigator.credentials.create({ publicKey });

    console.log("Credential Created", credential);
    return credential as PublicKeyCredential;
  } catch (err) {
    console.error(err);
  }
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  const binaryString = byteArray.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binaryString);
}

export function getLocalStorageCred(key: string) {
  const base64String = localStorage.getItem(key);
  if (!base64String) {
    throw new Error(`No item in localStorage for key: ${key}`);
  }

  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const handleRegistration = (credential: PublicKeyCredential) => {
  const credentialId = credential.id;
  const rawId = credential.rawId;
  const response = credential.response as AuthenticatorAttestationResponse;

  // Convert ArrayBuffer to Base64 for storage
  const clientDataJSON = arrayBufferToBase64(response.clientDataJSON);
  const attestationObject = arrayBufferToBase64(response.attestationObject);

  localStorage.setItem("credentialId", credentialId);
  localStorage.setItem("rawId", arrayBufferToBase64(rawId));
  localStorage.setItem("clientDataJSON", clientDataJSON);
  localStorage.setItem("attestationObject", attestationObject);
};

export const authenticate = async () => {
  try {
    const rawIdArrayBuffer = getLocalStorageCred("rawId");

    const assertionRequest: PublicKeyCredentialRequestOptions = {
      challenge: new Uint8Array([
        ...window.crypto.getRandomValues(new Uint8Array(32)),
      ]),
      allowCredentials: [
        {
          id: rawIdArrayBuffer,
          type: "public-key",
          transports: ["internal"] as AuthenticatorTransport[],
        },
      ],
    };

    const assertionResponse = await navigator.credentials.get({
      publicKey: assertionRequest,
    });
    console.log("Assertion Response", assertionResponse);

    // Send assertion response to server for verification
    // ...
  } catch (err) {
    console.error("Authentication error:", err);
  }
};

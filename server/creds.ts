export const STANRDARD_CREDENTIALS = {
  publicKey: {
    rp: {
      name: "JS Plugin",
    },
    user: {
      id: new Uint8Array(16),
      name: "dylanjhobbs@gmail.com",
      displayName: "Dylan Hobbs",
    },
    pubKeyCredParams: [
      {
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        alg: -7,
      },
    ],
    attestation: "direct",
    timeout: 60000,
    challenge: new Uint8Array([
      0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e, 0x17,
      0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7, 0x6a, 0x15,
      0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
    ]).buffer,
  },
};

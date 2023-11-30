import Image from "next/image";
import { Authenticator } from "./_components/authenticator";

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center text-black">
      <h1>Hello world</h1>
      <Authenticator />
    </main>
  );
}

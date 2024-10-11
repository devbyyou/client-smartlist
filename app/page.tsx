"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Bienvenue sur Smartli</h1>
      <p>Veuillez choisir une action :</p>
      <button onClick={() => router.push('/login')}>Se connecter</button>
      <button onClick={() => router.push('/register')}>S'inscrire</button>
    </div>
  );
}

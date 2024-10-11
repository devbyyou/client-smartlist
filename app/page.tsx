import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenue sur Smartli</h1>
      <p>Veuillez choisir une action :</p>
      <Link href="/login">
        <button>Se connecter</button>
      </Link>
      <Link href="/register">
        <button>S'inscrire</button>
      </Link>
    </div>
  );
}

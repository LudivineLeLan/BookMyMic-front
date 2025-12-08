import { useState } from "react";
import "../styles/Authentification.css"

export default function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegister ? "/user/register" : "/user/login";

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Une erreur est survenue");
        return;
      }

      if (!isRegister) {
        onLogin(data.token);
      } else {
        setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="auth-card">
      <h2>{isRegister ? "Créer un compte" : "Se connecter"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">{isRegister ? "S'inscrire" : "Se connecter"}</button>
      </form>
      <p className="auth-toggle">
        {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
        <span onClick={() => { setIsRegister(!isRegister); setMessage(""); }}>
          {isRegister ? "Se connecter" : "Créer un compte"}
        </span>
      </p>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

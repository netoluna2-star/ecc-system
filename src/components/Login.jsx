import { useState } from "react";
import { supabase } from "../lib/supabase";
import bg from "../assets/ecc.png";
import { cardStyle, inputStyle, primaryButton, secondaryButton } from "../styles/styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Preencha email e senha");
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return alert(error.message);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      return alert("Preencha email e senha");
    }

    // 🔎 verifica whitelist
    const { data } = await supabase
      .from("usuarios")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (!data) {
      return alert("❌ Seu email não está autorizado. Procure o administrador.");
    }

    // ✅ cria usuário
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    // 🚨 FORÇA LOGOUT
    await supabase.auth.signOut();

    alert("✅ Cadastro realizado! Agora faça login.");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={cardStyle}>
        <h2>ECC Paróquia Santo Antônio💙</h2>
        <h2>Solânea - PB💙</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={primaryButton}>
          Entrar
        </button>

        <button onClick={handleRegister} style={secondaryButton}>
          Criar conta
        </button>
      </div>
    </div>
  );
}
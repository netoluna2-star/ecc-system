import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import CasalForm from "./CasalForm";
import Filtros from "./Filtros";
import Aniversariantes from "./Aniversariantes";
import CasalItem from "./CasalItem";
import { dangerButton, sair } from "../styles/styles";

export default function Dashboard({ session }) {
  const user = session.user;

  const [role, setRole] = useState(null);
  const [casais, setCasais] = useState([]);
  const [mesFiltro, setMesFiltro] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [busca, setBusca] = useState("");
  const [email, setEmail] = useState("");
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [roleSelecionada, setRoleSelecionada] = useState("user");

  const [form, setForm] = useState({
    nome_dele: "",
    nome_dela: "",
    endereco: { rua: "", bairro: "", numero: "", cidade: "", estado: "" },
    fone_dele: "",
    fone_dela: "",
    data_do_casamento: "",
  });

  // 🔐 VALIDAÇÃO DE ACESSO
  useEffect(() => {
    if (!user) return;

    const initUser = async () => {
      const { data } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (!data) {
        alert("❌ Você não tem acesso ao sistema.");
        await supabase.auth.signOut();
        return;
      }

      if (!data.auth_id) {
        const { error } = await supabase
          .from("usuarios")
          .update({ auth_id: user.id })
          .eq("email", user.email);

        console.log("UPDATE ERROR:", error);
      }

      /*Estou construindo um sistema com React + Supabase, já tenho login, RLS e controle de usuários. Quero continuar daqui."*/

      setRole(data.role);
      setCheckingAccess(false);
    };

    initUser();
  }, [user]);

  // 📥 BUSCAR DADOS
  const fetchCasais = async () => {
    const { data, error } = await supabase
      .from("casais")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return alert(error.message);

    setCasais(data || []);
  };

  useEffect(() => {
    fetchCasais();
  }, []);

  const getMes = (data) => {
    if (!data) return null;
    return Number(data.split("T")[0].split("-")[1]);
  };

  const salvar = async () => {
    let error;

    if (editandoId) {
      ({ error } = await supabase
        .from("casais")
        .update(form)
        .eq("id", editandoId));
      setEditandoId(null);
    } else {
      ({ error } = await supabase.from("casais").insert([form]));
    }

    if (error) return alert(error.message);

    setForm({
      nome_dele: "",
      nome_dela: "",
      endereco: { rua: "", bairro: "", numero: "", cidade: "", estado: "" },
      fone_dele: "",
      fone_dela: "",
      data_do_casamento: "",
    });

    fetchCasais();
  };

  const deletar = async (id) => {
    const { error } = await supabase.from("casais").delete().eq("id", id);
    if (error) return alert(error.message);
    fetchCasais();
  };

  const editar = (c) => {
    setForm(c);
    setEditandoId(c.id);
  };

  const casaisFiltrados = casais.filter((c) => {
    const termo = busca.toLowerCase();

    return (
      (!termo ||
        c.nome_dele?.toLowerCase().includes(termo) ||
        c.nome_dela?.toLowerCase().includes(termo)) &&
      (!mesFiltro ||
        getMes(c.data_do_casamento) === Number(mesFiltro))
    );
  });

  // 👤 CONVIDAR USUÁRIO
  const convidarUsuario = async () => {
    if (!email) return alert("Informe um email");

    const { data: existente } = await supabase
      .from("usuarios")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existente) {
      return alert("Usuário já cadastrado");
    }

    const { error } = await supabase.from("usuarios").insert([
      {
        email,
        role: roleSelecionada,
        ativo: true,
      },
    ]);

    if (error) return alert(error.message);

    alert(`✅ ${email} autorizado!`);
    setEmail("");
    setRoleSelecionada("user");
  };

  if (checkingAccess) {
    return <div style={{ padding: 20 }}>Validando acesso...</div>;
  }

  console.log("USER:", user);

  return (
    <div style={{ padding: 80 }}>
      <p>{user.email} ({role})</p>

      {role === "admin" && (
        <>
          <input
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: 10 }}
          />

          <select
            value={roleSelecionada}
            onChange={(e) => setRoleSelecionada(e.target.value)}
            style={{ marginRight: 10 }}
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={convidarUsuario} style={{ ...dangerButton }}>
            Convidar usuário
          </button>
        </>
      )}

      <button
        onClick={() => supabase.auth.signOut()}
        style={{ ...dangerButton, ...sair }}
      >
        Sair
      </button>

      <CasalForm
        form={form}
        setForm={setForm}
        salvar={salvar}
        editandoId={editandoId}
      />

      <Filtros
        busca={busca}
        setBusca={setBusca}
        mesFiltro={mesFiltro}
        setMesFiltro={setMesFiltro}
      />

      <Aniversariantes casais={casais} />

      {casaisFiltrados.map((c) => (
        <CasalItem
          key={c.id}
          c={c}
          editar={editar}
          deletar={deletar}
          role={role}
        />
      ))}
    </div>
  );
}
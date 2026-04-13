import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import CasalForm from "./CasalForm";
import Filtros from "./Filtros";
import Aniversariantes from "./Aniversariantes";
import CasalItem from "./CasalItem";
import { dangerButton, cardStyle, inputStyle, primaryButton, secondaryButton } from "../styles/styles";

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
  const [salvando, setSalvando] = useState(false);

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
      setRole(data.role);
      setCheckingAccess(false);
    };
    initUser();
  }, [user]);

  // 📥 BUSCAR TODOS OS DADOS (Sem limite de página)
  const fetchCasais = async () => {
    let query = supabase
      .from("casais")
      .select("*")
      .order("created_at", { ascending: false });

    if (role !== "admin") {
      query = query.eq("criado_por", user.id);
    }

    const { data, error } = await query;
    if (error) return alert(error.message);
    setCasais(data || []);
  };

  useEffect(() => {
    if (role) fetchCasais();
  }, [role]);

  // 🔍 LÓGICA DE FILTRO (Local e Estável)
  const getMes = (data) => {
    if (!data) return null;
    return Number(data.split("-")[1]);
  };

  const casaisFiltrados = casais.filter((c) => {
    const termo = busca.toLowerCase();
    const bateNome = !termo || c.nome_dele?.toLowerCase().includes(termo) || c.nome_dela?.toLowerCase().includes(termo);
    const bateMes = !mesFiltro || getMes(c.data_do_casamento) === Number(mesFiltro);
    return bateNome && bateMes;
  });

  // 💾 FUNÇÕES DE AÇÃO (Salvar, Editar, Deletar...)
  const salvar = async () => {
    if (!form.nome_dele || !form.nome_dela) {
      return alert("Por favor, preencha os nomes do casal.");
    }

    setSalvando(true);

    // 1. TRAVA DE DUPLICIDADE (Lógica Original)
    if (!editandoId) {
      const fone1 = form.fone_dele?.trim();
      const fone2 = form.fone_dela?.trim();
      const telefones = [fone1, fone2].filter(f => f && f.length > 5);

      if (telefones.length > 0) {
        // Esta sintaxe com aspas duplas "${f}" é a que o Supabase 
        // entende melhor para campos de texto com caracteres especiais
        const filtros = telefones
          .map(f => `fone_dele.eq."${f}",fone_dela.eq."${f}"`)
          .join(",");

        const { data: existente } = await supabase
          .from("casais")
          .select("id, nome_dele, nome_dela")
          .or(filtros)
          .maybeSingle();

        if (existente) {
          setSalvando(false);
          return alert(`⚠️ Telefone já cadastrado: ${existente.nome_dele} & ${existente.nome_dela}`);
        }
      }
    }

    // 2. SALVAMENTO
    try {
      const payload = { ...form, criado_por: user.id };
      let error;

      if (editandoId) {
        // Na edição, passamos o form direto
        ({ error } = await supabase.from("casais").update(form).eq("id", editandoId));
      } else {
        // No insert, passamos o payload com o ID do criador
        ({ error } = await supabase.from("casais").insert([payload]));
      }

      if (error) throw error;

      // LIMPEZA TOTAL
      setForm({
        nome_dele: "", nome_dela: "",
        endereco: { rua: "", bairro: "", numero: "", cidade: "", estado: "" },
        fone_dele: "", fone_dela: "",
        data_do_casamento: "",
      });
      setEditandoId(null);
      fetchCasais();
      alert("Sucesso!");
    } catch (err) {
      alert("Erro: " + err.message);
    } finally {
      setSalvando(false);
    }
  };

  const deletar = async (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      await supabase.from("casais").delete().eq("id", id);
      fetchCasais();
    }
  };

  const editar = (c) => {
    setForm(c);
    setEditandoId(c.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const convidarUsuario = async () => {
    if (!email) return alert("Informe um email");
    const { error } = await supabase.from("usuarios").insert([{ email, role: roleSelecionada, ativo: true }]);
    if (error) return alert(error.message);
    alert("Autorizado!");
    setEmail("");
  };

  if (checkingAccess) return <div style={{ padding: 20 }}>Validando acesso...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p>{user.email.split('@')[0]} ({role})</p>
        <button onClick={() => supabase.auth.signOut()} style={dangerButton}>Sair</button>
      </div>

      {role === "admin" && (
        <div style={cardStyle}>
          <h4>Convidar Usuário</h4>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <select value={roleSelecionada} onChange={(e) => setRoleSelecionada(e.target.value)} style={inputStyle}>
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={convidarUsuario} style={primaryButton}>Convidar</button>
        </div>
      )}

      <CasalForm form={form} setForm={setForm} salvar={salvar} editandoId={editandoId} salvando={salvando} />
      
      <Filtros busca={busca} setBusca={setBusca} mesFiltro={mesFiltro} setMesFiltro={setMesFiltro} />

      <Aniversariantes casais={casais} />

      {/* LISTA FILTRADA */}
      {casaisFiltrados.map((c) => (
        <CasalItem key={c.id} c={c} editar={editar} deletar={deletar} role={role} />
      ))}

      <p style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
        Total: {casaisFiltrados.length} casais encontrados
      </p>
    </div>
  );
}
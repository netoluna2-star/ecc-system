import { inputStyle, primaryButton, cardStyle } from "../styles/styles";

// 1. ADICIONADO "salvando" aqui nas props
export default function CasalForm({ form, setForm, salvar, editandoId, salvando }) {
  // Função que formata o valor enquanto digita: (83) 99999-9999
  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove tudo que não é número
      .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen no celular
      .replace(/(-\d{4})\d+?$/, "$1"); // Limita a quantidade de números
  };
  return (
    <div style={cardStyle}>
      <h3>{editandoId ? "Editar Casal" : "Novo Casal"}</h3>

      <input
        placeholder="Nome dele"
        value={form.nome_dele}
        onChange={(e) => setForm({ ...form, nome_dele: e.target.value.toUpperCase() })}
        style={inputStyle}
      />

      <input
        type="tel"
        placeholder="Telefone dele"
        value={form.fone_dele}
        onChange={(e) => setForm({ 
          ...form, 
          fone_dele: formatarTelefone(e.target.value) 
        })}
        style={inputStyle}
      />

      <input
        placeholder="Nome dela"
        value={form.nome_dela}
        onChange={(e) => setForm({ ...form, nome_dela: e.target.value.toUpperCase() })}
        style={inputStyle}
      />

      <input
        type="tel"
        placeholder="Telefone dela"
        value={form.fone_dela}
        onChange={(e) => setForm({ 
          ...form, 
          fone_dela: formatarTelefone(e.target.value) 
        })}
        style={inputStyle}
      />

      <input 
        type={form.data_do_casamento ? "date" : "text"}
        placeholder="Data do Casamento"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => !form.data_do_casamento && (e.target.type = "text")}
        value={form.data_do_casamento || ""}
        onChange={(e) => setForm({ ...form, data_do_casamento: e.target.value })}
        style={inputStyle}
      />

      <h4>Endereço</h4>

      <input
        placeholder="Rua"
        value={form.endereco.rua}
        onChange={(e) =>
          setForm({ ...form, endereco: { ...form.endereco, rua: e.target.value } })
        }
        style={inputStyle}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          placeholder="Nº"
          value={form.endereco.numero}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, numero: e.target.value } })
          }
          style={{ ...inputStyle, flex: 1 }}
        />
        <input
          placeholder="Bairro"
          value={form.endereco.bairro}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, bairro: e.target.value } })
          }
          style={{ ...inputStyle, flex: 3 }}
        />
      </div>

      <input
        placeholder="Cidade"
        value={form.endereco.cidade}
        onChange={(e) =>
          setForm({ ...form, endereco: { ...form.endereco, cidade: e.target.value } })
        }
        style={inputStyle}
      />

      <div style={{ marginBottom: 15 }}>
        <label><strong>Estado (UF):</strong></label>
        <select
          value={form.endereco.estado}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, estado: e.target.value } })
          }
          style={{ ...inputStyle, height: 40 }}
        >
          <option value="">Selecione...</option>
          <option value="PB">PB</option>
          <option value="PE">PE</option>
          <option value="RN">RN</option>
          <option value="CE">CE</option>
        </select>
      </div>

      <button 
        onClick={salvar} 
        disabled={salvando} 
        style={{ 
          ...primaryButton, 
          opacity: salvando ? 0.6 : 1, 
          cursor: salvando ? "not-allowed" : "pointer",
          width: '100%' // Garante que o botão preencha o card
        }}
      >
        {salvando ? "Processando..." : (editandoId ? "Atualizar Dados" : "Salvar Casal")}
      </button>  
    </div>
  );
}
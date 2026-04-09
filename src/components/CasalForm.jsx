import { inputStyle, primaryButton, secondaryButton, cardStyle } from "../styles/styles";

export default function CasalForm({ form, setForm, salvar, editandoId }) {
  return (
    <div style={cardStyle}>
      <h3>{editandoId ? "Editar Casal" : "Casal"}</h3>

      <input
        placeholder="Nome dele"
        value={form.nome_dele}
        onChange={(e) => setForm({ ...form, nome_dele: e.target.value.toUpperCase() })}
        style={inputStyle}
      />

      <input
          placeholder="Telefone dele"
          value={form.fone_dele}
          onChange={(e) => setForm({ ...form, fone_dele: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Nome dela"
          value={form.nome_dela}
          onChange={(e) => setForm({ ...form, nome_dela: e.target.value.toUpperCase() })}
          style={inputStyle}
        />

        <input
          placeholder="Telefone dela"
          value={form.fone_dela}
          onChange={(e) => setForm({ ...form, fone_dela: e.target.value })}
          style={inputStyle}
        />

        <input 
          type={form.data_do_casamento ? "date" : "text"} // Se tiver data, vira date. Se não, text.
          placeholder="Data do Casamento"
          onFocus={(e) => (e.target.type = "date")} // Vira data ao clicar
          onBlur={(e) => !form.data_do_casamento && (e.target.type = "text")} // Volta a ser texto se vazio
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

        <input
          placeholder="Número"
          value={form.endereco.numero}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, numero: e.target.value } })
          }
          style={inputStyle}
        />

        <input
          placeholder="Bairro"
          value={form.endereco.bairro}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, bairro: e.target.value } })
          }
          style={inputStyle}
        />

        <input
          placeholder="Cidade"
          value={form.endereco.cidade}
          onChange={(e) =>
            setForm({ ...form, endereco: { ...form.endereco, cidade: e.target.value } })
          }
          style={inputStyle}
        />

        <div style={{ marginBottom: 10 }}>
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
            {/* pode adicionar mais */}
          </select>
        </div>

      <button onClick={salvar} style={primaryButton}>
        {editandoId ? "Atualizar" : "Salvar"}
      </button>
    </div>
  );
}
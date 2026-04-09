import { cardStyle, inputStyle, dangerButton } from "../styles/styles";

export default function Filtros({
  busca,
  setBusca,
  mesFiltro,
  setMesFiltro,
}) {
  const limparFiltros = () => {
    setBusca("");
    setMesFiltro("");
  };

  return (
    <div style={cardStyle}>
      <h3>Filtros</h3>

      <input
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={inputStyle}
      />

      <select
        value={mesFiltro}
        onChange={(e) => setMesFiltro(e.target.value)}
        style={{ ...inputStyle, height: 40 }}
      >
        <option value="">Mês de aniversário de casamento</option>
        <option value="1">Janeiro</option>
        <option value="2">Fevereiro</option>
        <option value="3">Março</option>
        <option value="4">Abril</option>
        <option value="5">Maio</option>
        <option value="6">Junho</option>
        <option value="7">Julho</option>
        <option value="8">Agosto</option>
        <option value="9">Setembro</option>
        <option value="10">Outubro</option>
        <option value="11">Novembro</option>
        <option value="12">Dezembro</option>
      </select>

      <button onClick={limparFiltros} style={dangerButton}>
        Limpar filtros
      </button>
    </div>
  );
}
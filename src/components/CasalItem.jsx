import { cardStyle, dangerButton, primaryButton } from "../styles/styles"; // 👈 Adicionado primaryButton aqui

export default function CasalItem({ c, editar, deletar, role }) {
  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div style={cardStyle}>
      <strong>
        {c.nome_dele} & {c.nome_dela}
      </strong>

      <p>
        📍 {c.endereco?.rua}, {c.endereco?.numero} - {c.endereco?.bairro}
      </p>
      <p>
        {c.endereco?.cidade} - {c.endereco?.estado}
      </p>

      <p>📞 {c.fone_dele} / {c.fone_dela}</p>
      <p>💍 {formatarData(c.data_do_casamento)}</p>

      {/* Ajuste nos botões para mobile e adição das funções de clique */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button 
          onClick={() => editar(c)} // 👈 Adicionado o clique para editar
          style={{ ...primaryButton, flex: 1, margin: 0 }}
        >
          Editar
        </button>
        
        {role === "admin" && (
          <button 
            onClick={() => deletar(c.id)} // 👈 Adicionado o clique para deletar
            style={{ ...dangerButton, flex: 1, margin: 0 }}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
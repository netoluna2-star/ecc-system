import { cardStyle, dangerButton } from "../styles/styles";

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

      <button onClick={() => editar(c)} style={dangerButton}>
        Editar
      </button>

      {role === "admin" && (
        <button onClick={() => deletar(c.id)} style={dangerButton}>
          Excluir
        </button>
      )}
    </div>
  );
}
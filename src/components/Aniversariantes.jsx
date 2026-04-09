import { useState } from "react";
import { cardStyle, recolhe } from "../styles/styles";

export default function Aniversariantes({ casais }) {
  const [mostrar, setMostrar] = useState(false);

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;

  const getMes = (data) => {
    if (!data) return null;
    const limpa = data.split("T")[0];
    const partes = limpa.split("-");
    if (partes.length !== 3) return null;
    return Number(partes[1]);
  };

  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const calcularAnosCasamento = (data) => {
    if (!data) return "";
    const hoje = new Date();
    const casamento = new Date(data);

    let anos = hoje.getFullYear() - casamento.getFullYear();

    const aindaNaoFez =
      hoje.getMonth() < casamento.getMonth() ||
      (hoje.getMonth() === casamento.getMonth() &&
        hoje.getDate() < casamento.getDate());

    if (aindaNaoFez) anos--;

    return anos;
  };

  const ehHoje = (data) => {
    if (!data) return false;
    const [ano, mes, dia] = data.split("T")[0].split("-");
    return (
      Number(dia) === hoje.getDate() &&
      Number(mes) === hoje.getMonth() + 1
    );
  };

  const aniversariantes = casais.filter(
    (c) => getMes(c.data_do_casamento) === mesAtual
  );

  return (
    <div style={cardStyle}>
      <div onClick={() => setMostrar(!mostrar)} style={recolhe}>
        <h3 style={{ margin: 0 }}>
          🎉 Aniversariantes do mês {aniversariantes.length}
        </h3>
        <span>{mostrar ? "−" : "+"}</span>
      </div>

      {mostrar && (
        <div style={{ marginTop: 15 }}>
          {aniversariantes.length === 0 && (
            <p>Nenhum aniversariante este mês</p>
          )}

          {aniversariantes.map((c) => (
            <div
              key={c.id}
              style={{
                padding: 10,
                borderBottom: "1px solid #eee",
                background: ehHoje(c.data_do_casamento)
                  ? "#d4edda"
                  : "transparent",
              }}
            >
              <strong>
                {c.nome_dele} & {c.nome_dela}
              </strong>

              <p>💍 {formatarData(c.data_do_casamento)}</p>
              <p>🎊 {calcularAnosCasamento(c.data_do_casamento)} anos</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
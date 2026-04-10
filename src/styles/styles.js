export const centerStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f4f6f8"
};

const resetBoxSizing = {
  boxSizing: "border-box", // 👈 ESTE É O PULOS DO GATO PARA MOBILE
  width: "100%", // Garante que tudo ocupe 100% por padrão
  maxWidth: "100%", // Evita que cresça além do container
};

export const inputStyle = {
  ...resetBoxSizing, // Aplica o reset e width
  padding: 12, // Aumentado um pouco para facilitar o toque no mobile
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16, // Aumentado de 14 para 16 (melhor para acessibilidade mobile)
  background: "#fdfdfd", // Uma cor de fundo leve para o input
};

export const sair = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "left",
  marginBottom: 20,
};

export const primaryButton = {
  ...resetBoxSizing, // Aplica o reset e width
  padding: 12, // Aumentado para facilitar o toque no mobile
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 10,
  fontSize: "16px",
};

export const inlineButton = {
  ...primaryButton,
  width: "auto",
  marginRight: "10px"
};

export const secondaryButton = {
  padding: 10,
  background: "#e5e7eb",
  border: "none",
  borderRadius: 6,
  marginRight: "10px",
  cursor: "pointer",
  marginTop: 10
};

export const dangerButton = {
  ...resetBoxSizing, // Aplica o reset e width (opcional, mas bom para garantir)
  width: "auto", // Sobrescreve para botão "Sair" ficar pequeno
  padding: 8,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  marginRight: "10px",
  cursor: "pointer"
};

export const cardStyle = {
  background: "#fff",
  padding: "15px", // Reduzido levemente
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  marginBottom: "15px",
  width: "100%", // Garante que ocupe a largura total disponível
  boxSizing: "border-box"
};

export const dashboardContainer = {
  padding: "20px", // Reduzido de 80 para 20
  maxWidth: "800px", // Limita a largura em telas grandes
  margin: "0 auto", // Centraliza o conteúdo
  boxSizing: "border-box"
};

export const recolhe = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer"
};

export const login = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(233, 230, 230, 0.3)"
}


export const BackButton = styled.button`
  position: absolute;
  top: 20px; /* Ajuste de posição */
  left: 20px;
  background-color: #6f42c1; /* Cor roxa */
  color: white;
  border: none;
  border-radius: 50%; /* Torna o botão circular */
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #5a34a1; /* Cor mais escura no hover */
  }
`;

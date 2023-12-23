import React, { useEffect, useState } from 'react';
import './adm.css';

const horarios = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

function Admpage() {
  const [tabela, setTabela] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([...horarios]);

  useEffect(() => {
    const tabelaFromLocalStorage = getTabelaFromLocalStorage();
    setTabela(tabelaFromLocalStorage);
    setHorariosDisponiveis([...horarios]);
  }, []);

  const getTabelaFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('tabela')) || [];
  };

  const resetarSemana = () => {
    localStorage.removeItem('tabela');
    setTabela([]);
    alert("Semana resetada com sucesso!");
  };

  const formatarData = (data) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(data).toLocaleDateString('pt-BR', options);
  };

  const editarHorario = (index) => {
    const novoHorario = prompt('Digite o novo horário:', horariosDisponiveis[index]);

    if (novoHorario !== null) {
      setHorariosDisponiveis((prevHorarios) =>
        prevHorarios.map((hora, i) => (i === index ? novoHorario : hora))
      );
    }
  };

  const excluirHorario = (index) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este horário?');

    if (confirmacao) {
      setHorariosDisponiveis((prevHorarios) =>
        prevHorarios.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <>
      <div>
        <h1>VEJA SEUS CLIENTES DA SEMANA</h1>
        <div className='tabelaclientes'>
          <table id="agendaTable">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Telefone</th>
                <th>Cliente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tabela.map((item, index) => (
                <tr key={index}>
                  <td>{formatarData(item.dia)}</td>
                  <td>{item.hora}</td>
                  <td>{item.telefone}</td>
                  <td>{item.cliente}</td>
                  <td>
                    <button onClick={() => editarHorario(index)}>Editar</button>
                    <button onClick={() => excluirHorario(index)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className='tabelaclientes'>
        <button onClick={resetarSemana}>Resetar Semana</button>
        <br />
        <br />
        <br />
        <button>
            Configurações de horários
          </button>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default Admpage;

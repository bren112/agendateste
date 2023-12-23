import React, { useState, useEffect } from 'react';
import './config.css';
import img from '../../img/configadm.png';

const AdminPanel = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const carregarAgendamentos = () => {
      const agendamentosArmazenados = JSON.parse(localStorage.getItem('agendamentos')) || [];
      setAgendamentos(agendamentosArmazenados);
    };

    carregarAgendamentos();
  }, []);

  const setAgendamentosLocal = (novosAgendamentos) => {
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
  };

  const verHorariosDisponiveis = () => {
    const horarios = JSON.parse(localStorage.getItem('horarios')) || [];
    alert("Horários Disponíveis:\n" + horarios.join('\n'));
  };

  const adicionarHorarios = () => {
    const horarioInicio = prompt("Digite o horário de início (formato: HH:00):");
    const horarioFim = prompt("Digite o horário de término (formato: HH:00):");

    if (
      horarioInicio !== null &&
      horarioFim !== null &&
      horarioInicio !== '' &&
      horarioFim !== ''
    ) {
      const inicio = parseInt(horarioInicio);
      const fim = parseInt(horarioFim);

      if (isNaN(inicio) || isNaN(fim) || inicio < 0 || fim > 23 || inicio >= fim) {
        alert(
          'Horários inválidos. Certifique-se de que os horários são válidos e o horário de início é anterior ao horário de término.'
        );
        return;
      }

      const horarios = JSON.parse(localStorage.getItem('horarios')) || [];

      for (let hora = inicio; hora <= fim; hora++) {
        const novoHorario = hora.toString().padStart(2, '0') + ':00';

        if (!horarios.includes(novoHorario)) {
          horarios.push(novoHorario);
        }
      }

      localStorage.setItem('horarios', JSON.stringify(horarios));

      const novoAgendamento = {
        data: new Date().toLocaleDateString(),
        horario: `${horarioInicio}:00 - ${horarioFim}:00`,
      };

      setAgendamentosLocal([...agendamentos, novoAgendamento]);
    }
  };

  const excluirTodosHorarios = () => {
    localStorage.removeItem('horarios');
    setAgendamentosLocal([]);

    alert('Todos os horários foram removidos com sucesso!');
  };

  const excluirHorario = () => {
    const horarioParaExcluir = prompt('Digite o horário a ser excluído (formato: HH:00):');

    if (horarioParaExcluir !== null && horarioParaExcluir !== '') {
      const horarios = JSON.parse(localStorage.getItem('horarios')) || [];
      const indice = horarios.indexOf(horarioParaExcluir);

      if (indice !== -1) {
        horarios.splice(indice, 1);
        localStorage.setItem('horarios', JSON.stringify(horarios));

        const novosAgendamentos = agendamentos.filter(
          (agendamento) => agendamento.horario !== horarioParaExcluir
        );

        setAgendamentosLocal(novosAgendamentos);

        alert('Horário removido com sucesso!');
      } else {
        alert('Horário não encontrado.');
      }
    }
  };

  return (
    <div className="body">
      <br />
      <div className="containe">
        <h1>Painel do Administrador</h1>
        <img src={img} alt="" srcset="" />

        <div></div>
        <div>
          <button onClick={verHorariosDisponiveis}>Ver Horários Disponíveis/Agendamentos</button>
        </div>
        <div>
          <button onClick={adicionarHorarios}>Adicionar Horários</button>
        </div>
        <div>
          <button onClick={excluirTodosHorarios}>Excluir Todos os Horários</button>
        </div>
        <button onClick={excluirHorario}>Excluir Horário</button>
      </div>
    </div>
  );
};

export default AdminPanel;

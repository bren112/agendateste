import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import './cliente.css';
import img from '../../img/configcliente.png'

const HorarioCliente = () => {
  const [horarios, setHorarios] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const carregarHorarios = () => {
      const horariosArmazenados = JSON.parse(localStorage.getItem('horarios')) || [];
      setHorarios(horariosArmazenados);
    };

    carregarHorarios();
  }, []);

  const verHorariosDisponiveis = () => {
    alert("Horários Disponíveis:\n" + horarios.join('\n'));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const agendarHorario = (horario) => {
    const nome = window.prompt('Digite o seu nome:');
    const telefone = window.prompt('Digite o seu telefone:');

    if (nome && telefone) {
      const confirmacao = window.confirm(
        `Confirme os dados:\n\nData: ${selectedDate.toLocaleDateString('pt-BR')}\nHorário: ${horario}\nNome: ${nome}\nTelefone: ${telefone}`
      );

      if (confirmacao) {
        const novoHorario = `${selectedDate.toLocaleDateString('pt-BR')} - ${horario} - Nome: ${nome} - Telefone: ${telefone}`;
        
      
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
        <h1>Procurar Horários Disponíveis</h1>
      <div className="bodyy">
     
          <img src={img} alt="" srcset="" />
        <div className="container">
       
          <div>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              locale="pt-BR"
            />
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Exemplo de Modal"
          >
            <button onClick={closeModal}>Fechar</button>
            <br />
            <h1>Veja os horários que estão disponíveis</h1>
            <div className='cont-hor'>
              <div id="horarios">
                {horarios.map((horario, index) => (
                  <button key={index} onClick={() => agendarHorario(horario)}>
                    {horario}
                  </button>
                ))}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HorarioCliente;

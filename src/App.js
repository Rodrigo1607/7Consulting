import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Inicio');
  const [currentSubPage, setCurrentSubPage] = useState(null);
  const [clientes, setClientes] = useState([]); 

  const handleNavigation = (page, subPage = null) => {
    setCurrentPage(page);
    setCurrentSubPage(subPage);
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://localhost:7177/api/cliente');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao obter os clientes:', error);
    }
  };

  const adicionarCliente = async () => {
    const novoCliente = { nome: 'Novo Cliente', email: 'Novo Email' }; 
    debugger;
    try {
      const response = await fetch('https://localhost:7177/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
      });
      if (response.ok) {
        fetchClientes(); 
      } else {
        console.error('Erro ao adicionar o cliente');
      }
    } catch (error) {
      console.error('Erro ao adicionar o cliente:', error);
    }
  };

  const alterarCliente = async (id, novoNome, novoEmail) => {
    const clienteAtualizado = { nome: novoNome, email: novoEmail };
    debugger;
    try {
      const response = await fetch(`https://localhost:7177/api/cliente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteAtualizado)
      });
      if (response.ok) {
        fetchClientes();
      } else {
        console.error('Erro ao atualizar o cliente');
      }
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
    }
  };

  const excluirCliente = async (id) => {
    try {
      const response = await fetch(`https://localhost:7177/api/cliente/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchClientes();
      } else {
        console.error('Erro ao excluir o cliente');
      }
    } catch (error) {
      console.error('Erro ao excluir o cliente:', error);
    }
  };

  useEffect(() => {
    if (currentPage === 'CategoriaCliente' && currentSubPage === 'Consulta') {
      fetchClientes();
    }
  }, [currentPage, currentSubPage]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tela Inicial</h1>
        <nav>
          <ul className="nav-menu">
            <li className={currentPage === 'Inicio' ? 'active' : ''}>
              <button onClick={() => handleNavigation('Inicio')}>Início</button>
            </li>
            <li className={currentPage === 'CategoriaCliente' ? 'active' : ''}>
            <button onClick={() => {handleNavigation('CategoriaCliente', 'Consulta');fetchClientes();}}>Categoria Cliente</button>
              {currentPage === 'CategoriaCliente' && (
                <ul className="sub-menu">
                  <li className={currentSubPage === 'Consulta' ? 'active' : ''}>
                  <button onClick={() => {handleNavigation('CategoriaCliente', 'Consulta');fetchClientes();}}>Categoria Cliente</button>
                  </li>
                  <li className={currentSubPage === 'Insercao' ? 'active' : ''}>
                  <button onClick={() => handleNavigation('CategoriaCliente', 'Insercao')}>Inserção</button>
                  </li>
                  <li className={currentSubPage === 'Alteracao' ? 'active' : ''}>
                    <button onClick={() => handleNavigation('CategoriaCliente', 'Alteracao')}>Alteração</button>
                  </li>
                  <li className={currentSubPage === 'Exclusao' ? 'active' : ''}>
                  <button onClick={() => handleNavigation('CategoriaCliente', 'Exclusao') }>Exclusão</button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-content">
        {currentPage === 'Inicio' && (
          <div>
            <h2>Conteúdo Inicial</h2>
            <p>Este é o conteúdo da página de Início.</p>
          </div>
        )}
        {currentPage === 'CategoriaCliente' && currentSubPage === 'Consulta' && (
          <div>
            <h2>Categoria Cliente - Consulta</h2>
            <p>Este é o conteúdo da página de Consulta da Categoria Cliente.</p>
          </div>
        )}
        {currentPage === 'CategoriaCliente' && currentSubPage === 'Insercao' && (
          <div>
            <h2>Categoria Cliente - Inserção</h2>
            <label>Nome do Cliente: </label>
             <input type="text" id="NovoNome"/>
             <br></br>
             <label>Email: </label>
             <input type="text" id="NovoEmail"/>
             <br></br>

             <button id="adicionarClienteButton" onClick={() => {adicionarCliente(); }}>Adicionar Cliente</button>
          </div>
        )}
        {currentPage === 'CategoriaCliente' && currentSubPage === 'Alteracao' && (
          <div>
            <h2>Categoria Cliente - Alteração </h2>
            <label>Informe o Id: </label>
             <input type="text" id="Id"/>
             <br></br>
            <label>Nome do Cliente: </label>
             <input type="text" id="novoNome"/>
             <br></br>
             <label>Email: </label>
             <input type="text" id="novoEmail"/>
             <br></br>

             <button id="AlterarClienteButton" onClick={() => {alterarCliente(); }}>Alterar Cliente</button>          
          </div>
        )}
        {currentPage === 'CategoriaCliente' && currentSubPage === 'Exclusao' && (
          <div>
            <h2>Categoria Cliente - Exclusão</h2>
            <label>Informe o Id: </label>
             <input type="text" id="Id"/>
             <br></br>
             <button id="ExcluirClienteButton" onClick={() => {excluirCliente(); }}>Excluir Cliente</button>          
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

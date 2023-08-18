// Repositories/ClienteRepository.cs
using CadastroCliente.Models;
using CadastroCliente.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

public class ClienteRepository : IClienteRepository
{
    private readonly List<Cliente> _clientes = new List<Cliente>();

    public IEnumerable<Cliente> GetAllClientes()
    {
        return _clientes;
    }

    public Cliente GetClienteById(int id)
    {
        return _clientes.FirstOrDefault(c => c.Id == id);
    }

    public void AddCliente(Cliente cliente)
    {
        cliente.Id = _clientes.Any() ? _clientes.Max(c => c.Id) + 1 : 1;
        _clientes.Add(cliente);
    }

    public void UpdateCliente(Cliente cliente)
    {
        var existingCliente = _clientes.FirstOrDefault(c => c.Id == cliente.Id);
        if (existingCliente != null)
        {
            existingCliente.Nome = cliente.Nome;
            existingCliente.Email = cliente.Email;

        }
    }

    public void DeleteCliente(int id)
    {
        var clienteToRemove = _clientes.FirstOrDefault(c => c.Id == id);
        if (clienteToRemove != null)
        {
            _clientes.Remove(clienteToRemove);
        }
    }

    public Cliente GetClienteByName(string name)
    {
        return _clientes.FirstOrDefault(c => c.Nome == name);
    }

    public Cliente GetClienteByEmail(string email)
    {
        return _clientes.FirstOrDefault(c => c.Email == email);
    }
}

using CadastroCliente.Models;

namespace CadastroCliente.Repositories
{
    public interface IClienteRepository
    {
        IEnumerable<Cliente> GetAllClientes();
        Cliente GetClienteById(int id);
        void AddCliente(Cliente cliente);
        void UpdateCliente(Cliente cliente);
        void DeleteCliente(int id);
        Cliente GetClienteByName(string name);
        Cliente GetClienteByEmail(string email);
    }
}

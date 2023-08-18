// Controllers/ClienteController.cs
using CadastroCliente.Models;
using CadastroCliente.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ClienteController : ControllerBase
{
    private readonly IClienteRepository _clienteRepository;

    public ClienteController(IClienteRepository clienteRepository)
    {
        _clienteRepository = clienteRepository;
    }

    [HttpGet]
    public IEnumerable<Cliente> GetAllClientes()
    {
        return _clienteRepository.GetAllClientes();
    }

    [HttpGet("{id}")]
    public IActionResult GetClienteById(int id)
    {
        var cliente = _clienteRepository.GetClienteById(id);
        if (cliente == null)
        {
            return NotFound();
        }
        return Ok(cliente);
    }

    [HttpGet("{name}")]
    public IActionResult GetClienteByName(string name)
    {
        var cliente = _clienteRepository.GetClienteByName(name);
        if (cliente == null)
        {
            return NotFound();
        }
        return Ok(cliente);
    }

    [HttpGet("{email}")]
    public IActionResult GetClienteByEmail(string email)
    {
        var cliente = _clienteRepository.GetClienteByEmail(email);

        if (cliente == null)
        {
            return NotFound();
        }

        return Ok(cliente);
    }



    [HttpPost]
    public IActionResult AddCliente(Cliente cliente)
    {
        _clienteRepository.AddCliente(cliente);
        return CreatedAtAction(nameof(GetClienteById), new { id = cliente.Id }, cliente);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCliente(int id, Cliente cliente)
    {
        if (id != cliente.Id)
        {
            return BadRequest();
        }

        _clienteRepository.UpdateCliente(cliente);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCliente(int id)
    {
        _clienteRepository.DeleteCliente(id);
        return NoContent();
    }
}

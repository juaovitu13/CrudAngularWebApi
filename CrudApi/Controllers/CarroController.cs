using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudApi.Context;
using CrudApi.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarroController : ControllerBase
    {
        private readonly CarroContext _context;
        public CarroController(CarroContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(Carro carro)
        {
            _context.Add(carro);
            _context.SaveChanges();
            return CreatedAtAction(nameof(ObterPorId), new {id = carro.Id}, carro);
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var carro = _context.Carros.Find(id);

            if(carro == null)
               return NotFound();
            return Ok(carro);
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            var carro = _context.Carros.ToList();
            return Ok(carro);
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Carro carro)
        {
            var CarroBanco = _context.Carros.Find(id);

            if(CarroBanco == null)
                return NotFound();

            CarroBanco.Marca = carro.Marca;
            CarroBanco.Modelo = carro.Modelo;
            CarroBanco.Ano = carro.Ano;
            CarroBanco.Cor = carro.Cor;
            CarroBanco.Placa = carro.Placa;

            _context.Carros.Update(CarroBanco);
            _context.SaveChanges();

            return Ok(CarroBanco);
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var CarroBanco = _context.Carros.Find(id);

            if(CarroBanco == null)
                return NotFound();

            _context.Carros.Remove(CarroBanco);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
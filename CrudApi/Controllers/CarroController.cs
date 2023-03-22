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

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var carro = _context.Carros.Find(id);

            if(carro == null)
               return NotFound();
            return Ok(carro);
        }

        [HttpGet("ObterTodos")]
        public IActionResult ObterTodos()
        {
            var carro = _context.Carros.ToList();
            return Ok(carro);
        }

        [HttpPost]
        public IActionResult Create(Carro carro)
        {
            _context.Add(carro);
            _context.SaveChanges();
            return CreatedAtAction(nameof(ObterPorId), new {id = carro.Id}, carro);
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CrudApi.Entities;

namespace CrudApi.Context
{
    public class CarroContext : DbContext
    {
        public CarroContext(DbContextOptions<CarroContext> options) : base(options)
        {

        }

        public DbSet<Carro> Carros { get; set; }
    }
}
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        public readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return Ok(await _context.Employees.ToListAsync());

        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Employee>>> UpdateSuperHero(Employee employee)
        {
            var dbCrud = await _context.Employees.FindAsync(employee.Id);
            if (dbCrud == null)
                return BadRequest("Empleado no econtrado.");

            dbCrud.Name = employee.Name;
            dbCrud.LastName = employee.LastName;
            dbCrud.Phone = employee.Phone;
            dbCrud.Email = employee.Email;
            dbCrud.Profession = employee.Profession;

            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteSuperHero(int id)
        {
            var dbHero = await _context.Employees.FindAsync(id);
            if (dbHero == null)
                return BadRequest("Empleado no econtrado.");

            _context.Employees.Remove(dbHero);
            await _context.SaveChangesAsync();

            return Ok(await _context.Employees.ToListAsync());
        }
    }
}

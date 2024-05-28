using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        [HttpPost]
        [Route("Add")]
        public IActionResult Add([FromBody] ML.Cliente cliente)
        {
            var result = BL.Cliente.Add(cliente);

            if (result.Item1)
            {
                return Ok(result.Item1);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }

        [HttpPut]
        [Route("Update")]
        public IActionResult Update([FromBody] ML.Cliente cliente)
        {
            var result = BL.Cliente.Update(cliente);

            if (result.Item1)
            {
                return Ok(result.Item1);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int IdCliente)
        {
            var result = BL.Cliente.Delete(IdCliente);

            if (result.Item1)
            {
                return Ok(result.Item1);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }
        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            var result = BL.Cliente.GetAll();

            if (result.Item1)
            {
                return Ok(result.Item3);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }
        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(int IdCliente)
        {
            var result = BL.Cliente.GetById(IdCliente);

            if (result.Item1)
            {
                return Ok(result.Item3);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }
        [HttpGet]
        [Route("GetAllSucursal")]
        public IActionResult GetAllSucursal()
        {
            var result = BL.Sucursal.GetAll();

            if (result.Item1)
            {
                return Ok(result.Item3.Sucursales);
            }
            else
            {
                return BadRequest(result.Item2);
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Linq;
using api_empresa.Models;
using System.Threading.Tasks;

namespace api_empresa.Controllers{
    [Route("api/[controller]")]
    public class PuestosController : Controller{
        private Conexion dbConexion;
        public PuestosController(){
            dbConexion = Conectar.Create();
        }
        [HttpGet]
        public ActionResult Get(){
            return Ok(dbConexion.Puestos.ToArray());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id){
            var puestos = await dbConexion.Puestos.FindAsync(id);
            if(puestos != null){
                return Ok(puestos);
            }else{
                return NotFound();
            }
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Puestos puestos){
            if(ModelState.IsValid){
                dbConexion.Puestos.Add(puestos);
                await dbConexion.SaveChangesAsync();
                return Ok(puestos);
            }else{
                return NotFound();
            }
        }
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Puestos puestos){
            var v_puestos = dbConexion.Puestos.SingleOrDefault(a => a.id_puesto == puestos.id_puesto);
            if(v_puestos != null && ModelState.IsValid){
                dbConexion.Entry(v_puestos).CurrentValues.SetValues(puestos);
                await dbConexion.SaveChangesAsync();
                return Ok();
            }else{
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id){
             var puestos = dbConexion.Puestos.SingleOrDefault(a => a.id_puesto == id);
             if(puestos != null){
                 dbConexion.Puestos.Remove(puestos);
                 await dbConexion.SaveChangesAsync();
                 return Ok();
             }else{
                 return NotFound();
             }
        }

    }
}
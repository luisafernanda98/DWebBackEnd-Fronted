using System.ComponentModel.DataAnnotations;
using System.Linq;
namespace api_empresa.Models{
    public class Empleados{
        [Key]
        public int id_empleado {get;set;}
        public string codigo {get;set;}
        public string nombres {get;set;}
        public string apellidos {get;set;}
        public string direccion {get;set;}
        public string telefono {get;set;}
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode=true, DataFormatString = "{0:yyyy-MM-dd}")]
        public System.DateTime fecha_nacimiento {get;set;}
        public string id_puesto {get;set;}
    }

}
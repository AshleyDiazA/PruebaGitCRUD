using System.ComponentModel.DataAnnotations;

namespace ML
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "Ingresa solo letras")]
        public string Nombre { get; set; }
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "Ingresa solo letras")]
        public string ApellidoPaterno { get; set; }
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "Ingresa solo letras")]
        public string ApellidoMaterno { get; set; }
        [DataType(DataType.EmailAddress, ErrorMessage = "Direccion no valida")]
        public string Email { get; set; }
        [RegularExpression("(^[0-9]+$)", ErrorMessage = "Solo se permiten números")]
        [StringLength(10, ErrorMessage = "El número es demasiado largo")]
        public string Telefono { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public Sucursal Sucursal { get; set; }
        public List<Cliente> Clientes { get; set; }
    }
}

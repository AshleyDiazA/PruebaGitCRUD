using System.ComponentModel.DataAnnotations;

namespace ML
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        [RegularExpression("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$", ErrorMessage = "Ingresa solo letras")]
        public string Nombre { get; set; }
        [RegularExpression("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$", ErrorMessage = "Ingresa solo letras")]
        public string ApellidoPaterno { get; set; }
        [RegularExpression("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$", ErrorMessage = "Ingresa solo letras")]
        public string ApellidoMaterno { get; set; }
        [EmailAddress(ErrorMessage = "Dirección no válida")]
        public string Email { get; set; }
        [RegularExpression("^[0-9]{10}$", ErrorMessage = "El número debe tener exactamente 10 dígitos")]
        public string Telefono { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public Sucursal Sucursal { get; set; }
        public List<Cliente> Clientes { get; set; }
    }
}

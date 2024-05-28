namespace ML
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public Sucursal Sucursal { get; set; }
        public List<Cliente> Clientes { get; set; }
    }
}

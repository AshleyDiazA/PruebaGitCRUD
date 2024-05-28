using System;
using System.Collections.Generic;

namespace DL;

public partial class Cliente
{
    public int IdCliente { get; set; }

    public string Nombre { get; set; } = null!;

    public string ApellidoPaterno { get; set; } = null!;

    public string ApellidoMaterno { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public DateTime FechaRegistro { get; set; }

    public int IdSucursal { get; set; }

    public virtual Sucursal IdSucursalNavigation { get; set; } = null!;
}

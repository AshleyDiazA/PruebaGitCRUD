using System;
using System.Collections.Generic;

namespace DL;

public partial class Sucursal
{
    public int IdSucursal { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
}

namespace BL
{
    public class Cliente
    {
        public static (bool, string, Exception) Add(ML.Cliente cliente)
        {
            try
            {
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    int rowsAffected = context.Database.ExecuteSqlRaw($"AgregarCliente '{cliente.Nombre}','{cliente.ApellidoPaterno}','{cliente.ApellidoPaterno}'," +
                        $"'{cliente.Email}','{cliente.Telefono}','{cliente.Fecha_Registro}','{cliente.Sucursal.IdSucursal}'");

                    if (rowsAffected > 0)
                    {
                        return (true, "Se agrego correctamente", null);

                    }
                    else
                    {
                        return (false, "No se pudo agregar", null);
                    }


                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, ex);
            }
        }
        public static (bool, string, Exception) Update(ML.Cliente cliente)
        {
            try
            {
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    int rowsAffected = context.Database.ExecuteSqlRaw($"ActualizarCliente '{cliente.IdCliente}','{cliente.Nombre}','{cliente.ApellidoPaterno}','{cliente.ApellidoPaterno}'," +
                        $"'{cliente.Email}','{cliente.Telefono}','{cliente.Fecha_Registro}','{cliente.Sucursal.IdSucursal}'");

                    if (rowsAffected > 0)
                    {
                        return (true, "Se actualizo correctamente", null);
                    }
                    else
                    {
                        return (false, "No se pudo actualizar", null);
                    }

                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, ex);
            }
        }
        public static (bool, string, Exception) Delete(int IdCliente)
        {
            try
            {
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    int rowsAffected = context.Database.ExecuteSqlRaw($"EliminarCliente '{IdCliente}'");

                    if (rowsAffected > 0)
                    {
                        return (true, "Se elimino correctamente", null);
                    }
                    else
                    {
                        return (false, "No se pudo eliminare", null);
                    }

                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, ex);
            }
        }
        public static (bool, string, ML.Cliente, Exception) GetAll()
        {
            ML.Cliente clientes = new ML.Cliente();
            clientes.Clientes = new List<ML.Cliente>();
            try
            {
                using (DL.Class1 context = new DL.Class1())
                {

                    return (true, null, clientes, null);
                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, null, ex);
            }
        }
        public static (bool, string, ML.Cliente, Exception) GetById(int IdCliente)
        {
            ML.Cliente cliente = new ML.Cliente();
            try
            {
                using (DL.Class1 context = new DL.Class1())
                {
                    return (true, null, cliente, null);
                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, null, ex);
            }
        }
    }

    public class Sucursal
    {
        public static (bool, string, ML.Sucursal, Exception) GetAll()
        {
            ML.Sucursal sucursales = new ML.Sucursal();
            sucursales.Sucursales = new List<ML.Sucursal>();
            try
            {
                using (DL.Class1 context = new DL.Class1())
                {
                    return (true, null, sucursales, null);
                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, null, ex);
            }
        }

    }
}

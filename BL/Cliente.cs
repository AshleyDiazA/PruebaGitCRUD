using Microsoft.EntityFrameworkCore;

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
        public static (bool, string, List<ML.Cliente>, Exception) GetAll()
        {
            ML.Cliente clientes = new ML.Cliente();
            clientes.Clientes = new List<ML.Cliente>();
            try
            {
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    var result = (from cliente in context.Clientes
                                  select new
                                  {
                                      IdCliente = cliente.IdCliente,
                                      Nombre = cliente.Nombre,
                                      ApellidoPaterno = cliente.ApellidoPaterno,
                                      ApellidoMaterno = cliente.ApellidoMaterno,
                                      Email = cliente.Email,
                                      FechaRegistro = cliente.FechaRegistro,
                                      Telefono = cliente.Telefono,
                                      IdSucursal = cliente.IdSucursal,
                                      NombreSucursal = cliente.IdSucursalNavigation.Nombre
                                  }).ToList();


                    if (result != null)
                    {
                        foreach (var item in result)
                        {
                            ML.Cliente objCliente = new ML.Cliente();

                            objCliente.IdCliente = item.IdCliente;
                            objCliente.Nombre = item.Nombre;
                            objCliente.ApellidoPaterno = item.ApellidoPaterno;
                            objCliente.ApellidoMaterno = item.ApellidoMaterno;
                            objCliente.Email = item.Email;
                            objCliente.Telefono = item.Telefono;
                            objCliente.Fecha_Registro = item.FechaRegistro;
                            objCliente.Sucursal = new ML.Sucursal();
                            objCliente.Sucursal.IdSucursal = item.IdSucursal;
                            objCliente.Sucursal.Nombre = item.NombreSucursal;

                            clientes.Clientes.Add(objCliente);
                        }

                        return (true, null, clientes.Clientes, null);
                    }
                    else
                    {
                        return (false, "Esta vacio", null, null);
                    }

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
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    var result = (from clientes in context.Clientes
                                  where clientes.IdCliente == IdCliente
                                  select new
                                  {
                                      IdCliente = clientes.IdCliente,
                                      Nombre = clientes.Nombre,
                                      ApellidoPaterno = clientes.ApellidoPaterno,
                                      ApellidoMaterno = clientes.ApellidoMaterno,
                                      Email = clientes.Email,
                                      Telefono = clientes.Telefono,
                                      IdSucursal = clientes.IdSucursal
                                  }).SingleOrDefault();

                    if (result.IdCliente > 0)
                    {
                        cliente.IdCliente = result.IdCliente;
                        cliente.Nombre = result.Nombre;
                        cliente.ApellidoPaterno = result.ApellidoPaterno;
                        cliente.ApellidoMaterno = result.ApellidoMaterno;
                        cliente.Email = result.Email;
                        cliente.Telefono = result.Telefono;

                        cliente.Sucursal = new ML.Sucursal();
                        cliente.Sucursal.IdSucursal = result.IdSucursal;


                        return (true, null, cliente, null);
                    }
                    else
                    {
                        return (false, "No existe el registro", null, null);
                    }

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
                using (DL.SucursalCrudgitContext context = new DL.SucursalCrudgitContext())
                {
                    var result = (from sucursal in context.Sucursals
                                  select new
                                  {

                                      IdSucursal = sucursal.IdSucursal,
                                      Nombre = sucursal.Nombre
                                  }).ToList();

                    if (result != null)
                    {
                        foreach (var item in result)
                        {
                            ML.Sucursal objSucursal = new ML.Sucursal();

                            objSucursal.IdSucursal = item.IdSucursal;
                            objSucursal.Nombre = item.Nombre;

                            sucursales.Sucursales.Add(objSucursal);
                        }

                        return (true, null, sucursales, null);
                    }
                    else
                    {
                        return (false, "No hay registros", null, null);
                    }

                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message, null, ex);
            }
        }

    }
}

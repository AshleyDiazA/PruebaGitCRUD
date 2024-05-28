using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DL;

public partial class SucursalCrudgitContext : DbContext
{
    public SucursalCrudgitContext()
    {
    }

    public SucursalCrudgitContext(DbContextOptions<SucursalCrudgitContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Sucursal> Sucursals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=SucursalCRUDGIT;TrustServerCertificate = True;User ID=sa;Password=pass@word1;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Clientes__FCE039925AA17F36");

            entity.HasIndex(e => e.Email, "UQ_Email").IsUnique();

            entity.Property(e => e.IdCliente).HasColumnName("Id_cliente");
            entity.Property(e => e.ApellidoMaterno)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Apellido_Materno");
            entity.Property(e => e.ApellidoPaterno)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Apellido_Paterno");
            entity.Property(e => e.Email)
                .HasMaxLength(254)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasColumnType("datetime")
                .HasColumnName("Fecha_Registro");
            entity.Property(e => e.IdSucursal).HasColumnName("Id_Sucursal");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(30)
                .IsUnicode(false);

            entity.HasOne(d => d.IdSucursalNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.IdSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Clientes_Sucursal");
        });

        modelBuilder.Entity<Sucursal>(entity =>
        {
            entity.HasKey(e => e.IdSucursal).HasName("PK__Sucursal__02EDB3EAB83956C2");

            entity.ToTable("Sucursal");

            entity.HasIndex(e => e.Nombre, "UC_Nombre").IsUnique();

            entity.Property(e => e.IdSucursal).HasColumnName("Id_Sucursal");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

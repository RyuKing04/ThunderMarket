export const factura = [
  {
    Fecha: new Date('2023/10/25'),
    Total: 20000,
    Estado: "Pendiente",
    UsuarioID: 2,
    DireccionID: 2,
    MetodoDePagoID: 2,
    FacturaDetalle: {
      create: {
        Cantidad: 2,
        Subtotal: 2000,
        FacturaID: 1,
        ProductoID: 1,
      },
    },
  },
  {
    Fecha: new Date('2023/10/25'),
    Total: 20000,
    Estado: "Pagado",
    UsuarioID: 2,
    DireccionID: 2,
    MetodoDePagoID: 2,
    FacturaDetalle: {
      create: {
        Cantidad: 2,
        Subtotal: 2000,
        FacturaID: 2,
        ProductoID: 1,
      },
    },
  },
  {
    Fecha: new Date('2023/10/25'),
    Total: 20000,
    Estado: "Pendiente",
    UsuarioID: 5,
    DireccionID: 5,
    MetodoDePagoID: 5,
    FacturaDetalle: {
      create: {
        Cantidad: 3,
        Subtotal: 2000,
        FacturaID: 3,
        ProductoID: 2,
      },
    },
  },
];

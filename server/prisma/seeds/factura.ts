export const factura = [
    {
        Fecha: '2021-05-05',
        Total: 20000,
        Estado: 'Pendiente',
        UsuarioID: 2,
        DireccionID: 2,
        MetodoDePagoID: 2,
        facturaDetalle: {
            create: 
                {
        Cantidad: 2,
        Subtotal: 2000,
        FacturaID: 1,
        ProductoID: 1,
                }
            }
    },
    {
        Fecha: '2021-05-06',
        Total: 20000,
        Estado: 'Pagado',
        UsuarioID: 2,
        DireccionID: 2,
        MetodoDePagoID: 2,
        facturaDetalle: {
            create: 
                {
        Cantidad: 2,
        Subtotal: 2000,
        FacturaID: 2,
        ProductoID: 1,
                }
            }
    },
    {
        Fecha: '2021-05-07',
        Total: 20000,
        Estado: 'Pendiente',
        UsuarioID: 5,
        DireccionID: 5,
        MetodoDePagoID: 5,
        facturaDetalle: {
            create: 
                {
        Cantidad: 3,
        Subtotal: 2000,
        FacturaID: 3,
        ProductoID:2,
                }
            }
    },

    ]
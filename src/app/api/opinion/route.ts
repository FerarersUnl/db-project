import pool from "@/lib/database";

export async function GET() {
    try {
        const poolConnection = await pool.connect();

        const queryString = `
            SELECT 
                p.ID_Platillo,
                p.Nombre AS Platillo_Nombre,
                p.Categoria,
                p.Presentacion,
                p.Restaurante,
                p.Precio,
                c.ID_Comentario,
                c.Comentario,
                c.Calificacion,
                c.Fecha AS Comentario_Fecha
            FROM 
                Platillo p
            JOIN 
                Comentario c ON p.ID_Platillo = c.ID_Platillo;
        `;

        const result = await poolConnection.query(queryString);
        const dishesWithComments = result.rows;

        poolConnection.release();

        return new Response(JSON.stringify(dishesWithComments), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function POST(request: any) {
    /*
    const { Nombre, Apellido, Telefono, Metodo_Pago, Domicilio, Es_VIP, Nivel } = JSON.parse(request.body);

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO Cliente (Nombre, Apellido, Telefono, Metodo_Pago, Domicilio, Es_VIP, Nivel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [Nombre, Apellido, Telefono, Metodo_Pago, Domicilio, Es_VIP, Nivel]
        );
        const nuevoCliente = result.rows[0];
        client.release();

        return new Response(JSON.stringify({ nuevoCliente }), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    */
}
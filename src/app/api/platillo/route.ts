import pool from "@/lib/database";

export async function GET() {
    try {
        const plate = await pool.connect();
        const result = await plate.query('SELECT * FROM platillo');
        const plates = result.rows;
        plate.release();
        return new Response(JSON.stringify(plates), { status: 200 });
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
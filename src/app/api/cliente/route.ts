import pool from "@/lib/database";

interface ResponseCliente {
    nombre: string;
    apellido: string;
    telefono: string;
    metodoPago: string;
    domicilio: string;
    esVIP: boolean;
    nivel: number;
}

interface PutClienteRequest {
    idCliente: number;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    metodoPago?: string;
    domicilio?: string;
    esVIP?: boolean;
    nivel?: number;
}

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cliente');
        const clientes = result.rows;
        client.release();
        return new Response(JSON.stringify(clientes), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function POST(request: any) {
    const res: ResponseCliente = await request.json()

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO Cliente (Nombre, Apellido, Telefono, Metodo_Pago, Domicilio, Es_VIP, Nivel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [res.nombre, res.apellido, res.telefono, res.metodoPago, res.domicilio, res.esVIP, res.nivel]
        );
        const nuevoCliente = result.rows[0];
        client.release();

        return new Response(JSON.stringify({ nuevoCliente }), { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function DELETE(request: any) {
    const res = await request.json();
    const client = await pool.connect();

    try {
        // Start a transaction
        await client.query('BEGIN');

        // Manually delete the related records from the 'comentario' table
        await client.query('DELETE FROM comentario WHERE id_cliente = $1', [res.idCliente]);

        // Manually delete the related records from the 'platillo_orden' table
        await client.query('DELETE FROM platillo_orden WHERE id_orden IN (SELECT id_orden FROM orden WHERE id_cliente = $1)', [res.idCliente]);

        // Manually delete the related records from the 'orden' table
        await client.query('DELETE FROM orden WHERE id_cliente = $1', [res.idCliente]);

        // Delete the client with the specified ID
        const result = await client.query('DELETE FROM cliente WHERE id_cliente = $1 RETURNING *', [res.idCliente]);

        // Commit the transaction
        await client.query('COMMIT');

        // Release the client back to the pool
        client.release();

        // Check if a record was actually deleted
        if (result.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
        }

        const deletedClient = result.rows[0];
        return new Response(JSON.stringify({ deletedClient }), { status: 200 });

    } catch (error) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');

        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function PUT(request: any) {
    const res: PutClienteRequest = await request.json();
    const client = await pool.connect();
    try {

        // Start a transaction
        await client.query('BEGIN');

        // Update the client with the specified ID
        const result = await client.query(
            `UPDATE Cliente 
             SET Nombre = COALESCE($1, Nombre), 
                 Apellido = COALESCE($2, Apellido), 
                 Telefono = COALESCE($3, Telefono), 
                 Metodo_Pago = COALESCE($4, Metodo_Pago), 
                 Domicilio = COALESCE($5, Domicilio), 
                 Es_VIP = COALESCE($6, Es_VIP), 
                 Nivel = COALESCE($7, Nivel) 
             WHERE id_cliente = $8 
             RETURNING *`,
            [
                res.nombre,
                res.apellido,
                res.telefono,
                res.metodoPago,
                res.domicilio,
                res.esVIP,
                res.nivel,
                res.idCliente
            ]
        );

        // Commit the transaction
        await client.query('COMMIT');

        // Release the client back to the pool
        client.release();

        // Check if a record was actually updated
        if (result.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Client not found' }), { status: 404 });
        }

        const updatedClient = result.rows[0];
        return new Response(JSON.stringify({ updatedClient }), { status: 200 });

    } catch (error) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');

        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
export interface Cliente {
    apellido: string;
    domicilio: string;
    es_vip: boolean;
    id_cliente: number;
    metodo_pago: string;
    nivel: number;
    nombre: string;
    telefono: string;
}

export interface Platillo {
    id_platillo: number;
    nombre: string;
    categoria: string;
    presentacion: string;
    restaurante: string;
    precio: number;
}

export interface Repartidor {
    id_repartidor: number;
    nombre: string;
    apellido: string;
    rfc: string;
    curp: string;
    placas: string;
    domicilio: string;
    telefono: string;
}

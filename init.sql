
CREATE TABLE Platillo (
    ID_Platillo SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Categoria TEXT NOT NULL,
    Presentacion TEXT NOT NULL,
    Restaurante TEXT NOT NULL,
    Precio NUMERIC(10, 2) NOT NULL CHECK (Precio >= 0)
);

CREATE TABLE Repartidor (
    ID_Repartidor SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Apellido TEXT NOT NULL,
    RFC CHAR(13) UNIQUE NOT NULL,
    CURP CHAR(18) UNIQUE NOT NULL,
    Placas CHAR(10) UNIQUE NOT NULL,
    Domicilio TEXT NOT NULL,
    Telefono CHAR(10) UNIQUE NOT NULL
);

CREATE TABLE Cliente (
    ID_Cliente SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Apellido TEXT NOT NULL,
    Telefono CHAR(10) UNIQUE NOT NULL,
    Metodo_Pago TEXT NOT NULL,
    Domicilio TEXT NOT NULL,
    Es_VIP BOOLEAN DEFAULT FALSE,
    Nivel SMALLINT CHECK (Nivel >= 0 AND Nivel <= 5)
);

CREATE TABLE Orden (
    ID_Orden SERIAL PRIMARY KEY,
    Total NUMERIC(10, 2) NOT NULL CHECK (Total >= 0),
    Domicilio TEXT NOT NULL,
    Fecha TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ID_Platillo INT REFERENCES Platillo(ID_Platillo),
    ID_Repartidor INT REFERENCES Repartidor(ID_Repartidor),
    ID_Cliente INT REFERENCES Cliente(ID_Cliente)
);

CREATE TABLE Platillo_Orden (
    ID_Platillo INT REFERENCES Platillo(ID_Platillo),
    ID_Orden INT REFERENCES Orden(ID_Orden),
    Cantidad INT CHECK (Cantidad > 0),
    PRIMARY KEY (ID_Platillo, ID_Orden)
);

CREATE TABLE Comentario (
    ID_Comentario SERIAL PRIMARY KEY,
    Comentario TEXT,
    Calificacion SMALLINT CHECK (Calificacion >= 1 AND Calificacion <= 5),
    Fecha TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ID_Cliente INT REFERENCES Cliente(ID_Cliente),
    ID_Platillo INT REFERENCES Platillo(ID_Platillo)
);

INSERT INTO Platillo (Nombre, Categoria, Presentacion, Restaurante, Precio) VALUES 
('Pizza Margarita', 'Italiana', 'Mediana', 'Ristorante A', 10.00),
('Pasta Carbonara', 'Italiana', 'Tazón', 'Ristorante A', 12.00),
('Sushi', 'Japonesa', '8 piezas', 'Casa de Sushi', 15.00),
('Tempura', 'Japonesa', '6 piezas', 'Casa de Sushi', 9.00),
('Tacos al Pastor', 'Mexicana', '3 piezas', 'Taquería B', 6.00),
('Quesadilla', 'Mexicana', '1 pieza', 'Taquería B', 4.50),
('Hamburguesa', 'Americana', '1 pieza', 'FastFood C', 8.00),
('Nuggets de Pollo', 'Americana', '10 piezas', 'FastFood C', 5.00),
('Pad Thai', 'Tailandesa', 'Tazón', 'Cocina Tailandesa', 11.00),
('Sopa Tom Yum', 'Tailandesa', 'Taza', 'Cocina Tailandesa', 7.00),
('Churros', 'Postre', '5 piezas', 'Tienda de Postres', 3.00),
('Helado', 'Postre', '1 bola', 'Tienda de Postres', 2.50),
('Gyros', 'Griega', '1 pieza', 'Taberna Griega', 9.50),
('Moussaka', 'Griega', 'Rebanada', 'Taberna Griega', 10.50),
('Ensalada Vegana', 'Saludable', 'Tazón', 'Salud Primero', 8.50);

INSERT INTO Repartidor (Nombre, Apellido, RFC, CURP, Placas, Domicilio, Telefono) VALUES
('Juan', 'Pérez', 'JUAP010101ABC', 'JUAP010101HDFTRN0', 'XYZ123', 'Calle Principal 123', '1111111111'),
('María', 'García', 'MARG010101ABC', 'MARG010101HDFTRN1', 'ABC123', 'Calle Secundaria 456', '2222222222'),
('Carlos', 'Hernández', 'CARH010101ABC', 'CARH010101HDFTRN2', 'MNO456', 'Calle Tercera 789', '3333333333'),
('Ana', 'Martínez', 'ANAM010101ABC', 'ANAM010101HDFTRN3', 'PQR789', 'Calle Cuarta 101', '4444444444'),
('Luis', 'Rodríguez', 'LUIS010101ABC', 'LUIS010101HDFTRN4', 'STU112', 'Calle Quinta 202', '5555555555'),
('Sofía', 'González', 'SOFI010101ABC', 'SOFI010101HDFTRN5', 'VWX223', 'Calle Sexta 303', '6666666666'),
('Javier', 'López', 'JAVI010101ABC', 'JAVI010101HDFTRN6', 'YZA334', 'Calle Séptima 404', '7777777777'),
('Isabel', 'Sánchez', 'ISAB010101ABC', 'ISAB010101HDFTRN7', 'BCD445', 'Calle Octava 505', '8888888888'),
('Oscar', 'Ramírez', 'OSCR010101ABC', 'OSCR010101HDFTRN8', 'EFG556', 'Calle Novena 606', '9999999999'),
('Laura', 'Torres', 'LAUT010101ABC', 'LAUT010101HDFTRN9', 'HIJ667', 'Calle Décima 707', '1010101010'),
('David', 'Gómez', 'DAVG010101ABC', 'DAVG010101HDFTRN10', 'KLM778', 'Calle Once 808', '2020202020'),
('Susana', 'Ruiz', 'SUSN010101ABC', 'SUSN010101HDFTRN11', 'NOP889', 'Calle Doce 909', '3030303030'),
('Fernando', 'Ortiz', 'FERD010101ABC', 'FERD010101HDFTRN12', 'QRS990', 'Calle Trece 1010', '4040404040'),
('Rosa', 'Díaz', 'ROSD010101ABC', 'ROSD010101HDFTRN13', 'TUV001', 'Calle Catorce 1111', '5050505050'),
('Hugo', 'Vargas', 'HUGO010101ABC', 'HUGO010101HDFTRN14', 'WXY112', 'Calle Quince 1212', '6060606060');

INSERT INTO Cliente (Nombre, Apellido, Telefono, Metodo_Pago, Domicilio, Es_VIP, Nivel) VALUES 
('Alejandro', 'López', '1112223333', 'Tarjeta de Crédito', 'Calle Roble 789', TRUE, 5),
('Carmen', 'Martínez', '4445556666', 'Efectivo', 'Calle Arce 101', FALSE, 2),
('Esteban', 'González', '7778889999', 'PayPal', 'Calle Pino 202', FALSE, 1),
('Sara', 'Rodríguez', '3334445555', 'Tarjeta de Débito', 'Calle Abedul 303', TRUE, 4),
('Miguel', 'Pérez', '9990001111', 'Efectivo', 'Calle Cedro 404', FALSE, 3),
('Lucía', 'García', '2223334444', 'Tarjeta de Crédito', 'Calle Sauce 505', TRUE, 5),
('Diego', 'Fernández', '6667778888', 'Efectivo', 'Calle Álamo 606', FALSE, 1),
('Laura', 'Gutiérrez', '5556667777', 'PayPal', 'Calle Caoba 707', TRUE, 3),
('Carlos', 'Ortega', '8889990000', 'Tarjeta de Débito', 'Calle Fresno 808', FALSE, 2),
('Ana', 'Vázquez', '4445556667', 'Tarjeta de Crédito', 'Calle Peral 909', TRUE, 4),
('Luis', 'Romero', '1234567890', 'Efectivo', 'Calle Palma 1010', FALSE, 0),
('Sofía', 'Molina', '9876543210', 'PayPal', 'Calle Secuoya 1111', TRUE, 5),
('Javier', 'Torres', '2468135790', 'Tarjeta de Débito', 'Calle Olivo 1212', FALSE, 3),
('Isabel', 'Sánchez', '1357924680', 'Efectivo', 'Calle Eucalipto 1313', TRUE, 2),
('Oscar', 'Ramírez', '8642097531', 'Tarjeta de Crédito', 'Calle Ciprés 1414', FALSE, 1);

INSERT INTO Orden (Total, Domicilio, ID_Platillo, ID_Repartidor, ID_Cliente) VALUES 
(200.50, 'Calle Roble 789', 1, 1, 1),
(150.00, 'Calle Arce 101', 2, 2, 2),
(120.75, 'Calle Pino 202', 3, 3, 3),
(185.25, 'Calle Abedul 303', 4, 4, 4),
(90.00, 'Calle Cedro 404', 5, 5, 5),
(240.50, 'Calle Sauce 505', 6, 6, 6),
(110.00, 'Calle Álamo 606', 7, 7, 7),
(300.75, 'Calle Caoba 707', 8, 8, 8),
(175.25, 'Calle Fresno 808', 9, 9, 9),
(130.00, 'Calle Peral 909', 10, 10, 10),
(210.50, 'Calle Palma 1010', 11, 11, 11),
(250.75, 'Calle Secuoya 1111', 12, 12, 12),
(195.25, 'Calle Olivo 1212', 13, 13, 13),
(220.00, 'Calle Eucalipto 1313', 14, 14, 14),
(100.50, 'Calle Ciprés 1414', 15, 15, 15);

INSERT INTO Platillo_Orden (ID_Platillo, ID_Orden, Cantidad) VALUES 
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 3),
(5, 5, 2),
(6, 6, 4),
(7, 7, 1),
(8, 8, 3),
(9, 9, 1),
(10, 10, 2),
(11, 11, 1),
(12, 12, 2),
(13, 13, 1),
(14, 14, 1),
(15, 15, 2);

INSERT INTO Comentario (Comentario, Calificacion, ID_Cliente, ID_Platillo) VALUES 
('¡Sabor increíble!', 5, 1, 1),
('Demasiado salado', 2, 2, 2),
('Buen servicio', 4, 3, 3),
('Porción pequeña', 3, 4, 4),
('Excelente presentación', 5, 5, 5),
('Tardó mucho en llegar', 1, 6, 6),
('Muy caro para la calidad', 2, 7, 7),
('Rápido y delicioso', 5, 8, 8),
('Le faltaba sabor', 2, 9, 9),
('Excelente ambiente', 5, 10, 10),
('La comida estaba fría', 1, 11, 11),
('Volveré seguro', 5, 12, 12),
('Regular, nada especial', 3, 13, 13),
('Demasiado picante', 2, 14, 14),
('Me encantó, 100% recomendado', 5, 15, 15);

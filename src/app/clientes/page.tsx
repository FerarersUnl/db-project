'use client'

import { useEffect, useState } from 'react'
import {
    Box, useColorModeValue, Drawer, DrawerContent, useDisclosure,
    Text, Input, InputGroup, InputLeftElement,
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Stack,
    Spinner,
    Center
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'

interface Cliente {
    apellido: string;
    domicilio: string;
    es_vip: boolean;
    id_cliente: number;
    metodo_pago: string;
    nivel: number;
    nombre: string;
    telefono: string;
}


const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetch('/api/cliente')
            .then(response => response.json())
            .then(data => {
                setClientes(data);  // Cambiado de setClientes(data.cliente);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const filteredClientes = clientes.filter(cliente => {
        return Object.keys(cliente).some(key =>
            String((cliente as any)[key]).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {/* Content */}
                <Stack mr={20} ml={20}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                        <Text fontSize='xl'>Clientes</Text>
                        <InputGroup ml={2} mr={6} w={"25%"}>
                            <InputLeftElement pointerEvents='none'>
                                <FiSearch color='gray.300' />
                            </InputLeftElement>
                            <Input type='tel'
                                placeholder='Buscar'
                                borderColor={"gray.300"}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)} />
                        </InputGroup>
                    </Box>
                    <Stack>
                        {isLoading ? (
                            <Center>
                                <Spinner size="xl" />
                            </Center>
                        ) : (
                            <TableContainer>
                                <Table variant='simple'>
                                    <TableCaption>Datos de Clientes</TableCaption>
                                    <Thead>
                                        {/* ... header ... */}
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Nombre</Th>
                                            <Th>Apellido</Th>
                                            <Th>Domicilio</Th>
                                            <Th>VIP</Th>
                                            <Th>Método de pago</Th>
                                            <Th>Nivel</Th>
                                            <Th>Teléfono</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredClientes.length > 0 ? (
                                            filteredClientes.map((cliente, index) => (
                                                <Tr key={index}>
                                                    <Td>{cliente.id_cliente}</Td>
                                                    <Td>{cliente.nombre}</Td>
                                                    <Td>{cliente.apellido}</Td>
                                                    <Td>{cliente.domicilio}</Td>
                                                    <Td>{cliente.es_vip ? 'Sí' : 'No'}</Td>
                                                    <Td>{cliente.metodo_pago}</Td>
                                                    <Td>{cliente.nivel}</Td>
                                                    <Td>{cliente.telefono}</Td>
                                                </Tr>
                                            ))) : (
                                            <Tr>
                                                <Td colSpan={8}>No se encontraron resultados para "{searchTerm}"</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Clientes;
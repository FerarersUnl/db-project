'use client'

import type { Cliente } from '@/types/index'
import { useEffect, useState } from 'react'
import { FiSearch, FiPlus, FiTrash, FiTool } from 'react-icons/fi'
import {
    Box, useColorModeValue, Drawer, DrawerContent, useDisclosure,
    Text, Input, InputGroup, InputLeftElement, Table, TableCaption,
    TableContainer, Tbody, Td, Th, Thead, Tr, Stack, Spinner, Center,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter,
} from '@chakra-ui/react'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'



const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [esVip, setEsVip] = useState('');
    const [nivel, setNivel] = useState('');

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

    // Function to open modal
    const openAddModal = () => {
        setAddModalOpen(true);
    };

    // Function to close modal
    const closeAddModal = () => {
        setAddModalOpen(false);
    };
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {/* Content */}
                <Stack mr={20} ml={20}>
                    <Stack>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Text
                                fontSize='xl'>Clientes
                            </Text>
                        </Box>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Stack
                                direction='row'
                                spacing={4}
                                justifyContent={'space-between'} width="95%"
                            >
                                <Stack
                                    direction='row'>
                                    <Button
                                        rightIcon={<FiPlus />}
                                        colorScheme='green'
                                        variant='solid'
                                        onClick={openAddModal}
                                    >

                                        Añadir
                                    </Button>
                                    <Button
                                        rightIcon={<FiTrash />}
                                        colorScheme='red'
                                        variant='solid'
                                    >
                                        Eliminar
                                    </Button>
                                    <Button
                                        rightIcon={<FiTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                    >
                                        Editar
                                    </Button>
                                </Stack>
                                <InputGroup ml={2} mr={6} w="25%">
                                    <InputLeftElement pointerEvents='none'>
                                        <FiSearch color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                        placeholder='Buscar'
                                        borderColor={"gray.300"}
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)} />
                                </InputGroup>
                            </Stack>
                            <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Añadir Cliente</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                            <Input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                            <Input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                            <Input placeholder="Método de Pago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} />
                                            <Input placeholder="Domicilio" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
                                            <Input placeholder="Es VIP" value={esVip} onChange={(e) => setEsVip(e.target.value)} />
                                            <Input placeholder="Nivel" value={nivel} onChange={(e) => setNivel(e.target.value)} />
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" mr={3} onClick={closeAddModal}>
                                            Guardar
                                        </Button>
                                        <Button variant="ghost" onClick={closeAddModal}>
                                            Cancelar
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>
                    </Stack>
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
                </Stack >
            </Box >
        </Box >
    )
}

export default Clientes;
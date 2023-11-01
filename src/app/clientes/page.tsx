'use client'

import type { Cliente } from '@/types/index'
import { useEffect, useState } from 'react'
import { FiSearch, FiPlus, FiTrash, FiTool } from 'react-icons/fi'
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Stack,
    Spinner,
    Center,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
    RadioGroup,
    Radio,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'



const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [value, setValue] = useState('0');
    const [valueLvl, setValueLvl] = useState(1);
    const [idCliente, setIdCliente] = useState(0);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [clienteId, setClienteId] = useState('');


    // Filter function
    const filteredClientes = clientes.filter(cliente => {
        return Object.keys(cliente).some(key =>
            String((cliente as any)[key]).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const openEditModal = () => {
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    // Function to open modal
    const openAddModal = () => {
        setAddModalOpen(true);
    };

    // Function to close modal
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    // Function to open modal
    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    // Function to close modal
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const resetFormFields = () => {
        setIdCliente(0);
        setNombre('');
        setApellido('');
        setTelefono('');
        setMetodoPago('');
        setDomicilio('');
        setValue('0');
        setValueLvl(1);
    };

    const editCliente = async (id: any) => {
        const updatedCliente = {
            idCliente: id,
            nombre,
            apellido,
            telefono,
            metodoPago,
            domicilio,
            esVIP: value,
            nivel: valueLvl
        };

        try {
            const res = await fetch('/api/cliente', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCliente)
            });

            if (res.status === 200) {
                // Do something after successfully updating the client, like closing the modal or refreshing the list
                const data = await res.json();
                console.log("Updated Client:", data.updatedClient);
                await fetchData();
                closeEditModal();
            } else {
                // Handle error
                const data = await res.json();
                console.error("Error:", data.error);
            }

        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    const delCliente = async () => {
        const payload = {
            idCliente: idCliente
        };

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('/api/cliente', requestOptions);
            if (response.ok) {
                console.log("Delete sent successfully");
                closeAddModal();
                resetFormFields();
                // Re-fetch data
                await fetchData();
            } else {
                console.log(`Server error: ${response.status}`);
                closeAddModal();
            }
        } catch (error) {
            console.error(`Fetch error: ${error}`);
            closeAddModal();
        }
    };

    const addCliente = async () => {
        const payload = {
            nombre,
            apellido,
            telefono,
            metodoPago,
            domicilio,
            esVIP: value === '1',  // <-- change it to boolean here
            nivel: valueLvl
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('/api/cliente', requestOptions);
            if (response.ok) {
                console.log("Data sent successfully");
                closeAddModal();
                resetFormFields();
                // Re-fetch data
                await fetchData();
            } else {
                console.log(`Server error: ${response.status}`);
                closeAddModal();
            }
        } catch (error) {
            console.error(`Fetch error: ${error}`);
            closeAddModal();
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/cliente');
            const data = await response.json();
            setClientes(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                        onClick={openDeleteModal}
                                    >
                                        Eliminar
                                    </Button>
                                    <Button
                                        rightIcon={<FiTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                        onClick={openEditModal}  // Trigger openEditModal
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
                            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Editar Cliente</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Input placeholder="ID del Cliente" type='text' value={clienteId} onChange={(e) => setClienteId(e.target.value)} />
                                            <Input placeholder="Nombre" type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                            <Input placeholder="Apellido" type='text' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                            <Input placeholder="Teléfono" type='number' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                            <Select placeholder='Método de pago' value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                                                <option value='Tarjeta de Crédito'>Tarjeta de Crédito</option>
                                                <option value='Tarjeta de Débito'>Tarjeta de Débito</option>
                                                <option value='Efectivo'>Efectivo</option>
                                                <option value='Paypal'>Paypal</option>
                                            </Select>
                                            <Input placeholder="Domicilio" type='text' value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
                                            <RadioGroup onChange={setValue} value={value}>
                                                <Text>Status VIP</Text>
                                                <Stack direction='row'>
                                                    <Radio value='0'>No</Radio>
                                                    <Radio value='1'>Si</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <Text>Nivel</Text>
                                            <NumberInput
                                                onChange={(valueString, valueNumber) => setValueLvl(valueNumber)}
                                                value={valueLvl}
                                                min={1}
                                                max={5}
                                            >

                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" mr={3} onClick={() => editCliente(clienteId)}>
                                            Actualizar
                                        </Button>
                                        <Button variant="ghost" onClick={closeEditModal}>
                                            Cancelar
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Eliminar Cliente</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Text>Id del Cliente</Text>
                                            <Input placeholder="Id" type='text' value={idCliente} onChange={(e) => setIdCliente(Number(e.target.value))} />
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="red" mr={3} onClick={delCliente}>
                                            Eliminar
                                        </Button>
                                        <Button variant="ghost" onClick={closeDeleteModal}>
                                            Cancelar
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Añadir Cliente</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Input placeholder="Nombre" type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                            <Input placeholder="Apellido" type='text' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                                            <Input placeholder="Teléfono" type='number' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                                            <Select placeholder='Método de pago' value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                                                <option value='Tarjeta de Crédito'>Tarjeta de Crédito</option>
                                                <option value='Tarjeta de Débito'>Tarjeta de Débito</option>
                                                <option value='Efectivo'>Efectivo</option>
                                                <option value='Paypal'>Paypal</option>
                                            </Select>
                                            <Input placeholder="Domicilio" type='text' value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
                                            <RadioGroup onChange={setValue} value={value}>
                                                <Text>Status VIP</Text>
                                                <Stack direction='row'>
                                                    <Radio value='0'>No</Radio>
                                                    <Radio value='1'>Si</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <Text>Nivel</Text>
                                            <NumberInput
                                                onChange={(valueString, valueNumber) => setValueLvl(valueNumber)}
                                                value={valueLvl}
                                                min={1}
                                                max={5}
                                            >

                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Stack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="green" mr={3} onClick={addCliente}>
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
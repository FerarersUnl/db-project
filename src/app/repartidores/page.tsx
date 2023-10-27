'use client'

import type { Repartidor } from '@/types/index'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {
    Box, useColorModeValue, Drawer, DrawerContent, useDisclosure,
    Text, Input, InputGroup, InputLeftElement, Table, TableCaption,
    TableContainer, Tbody, Td, Th, Thead, Tr, Stack, Spinner, Center
} from '@chakra-ui/react'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'


const Repartidores = () => {
    const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('/api/repartidor')
            .then(response => response.json())
            .then(data => {
                setRepartidores(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const filteredRepartidores = repartidores.filter(repartidor => {
        return Object.keys(repartidor).some(key =>
            String((repartidor as any)[key]).toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Text fontSize='xl'>Repartidores</Text>
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
                                    <TableCaption>Datos de Repartidores</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Nombre</Th>
                                            <Th>Apellido</Th>
                                            <Th>RFC</Th>
                                            <Th>CURP</Th>
                                            <Th>Placas</Th>
                                            <Th>Domicilio</Th>
                                            <Th>Teléfono</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredRepartidores.length > 0 ? (
                                            filteredRepartidores.map((repartidor, index) => (
                                                <Tr key={index}>
                                                    <Td>{repartidor.id_repartidor}</Td>
                                                    <Td>{repartidor.nombre}</Td>
                                                    <Td>{repartidor.apellido}</Td>
                                                    <Td>{repartidor.rfc}</Td>
                                                    <Td>{repartidor.curp}</Td>
                                                    <Td>{repartidor.placas}</Td>
                                                    <Td>{repartidor.domicilio}</Td>
                                                    <Td>{repartidor.telefono}</Td>
                                                </Tr>
                                            ))
                                        ) : (
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

export default Repartidores;
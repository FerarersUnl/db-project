'use client'

import type { Platillo } from '@/types/index'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {
    Box, useColorModeValue, Drawer, DrawerContent, useDisclosure,
    Text, Input, InputGroup, InputLeftElement, Table, TableCaption,
    TableContainer, Tbody, Td, Th, Thead, Tr, Stack, Spinner, Center
} from '@chakra-ui/react'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'


const Platillos = () => {
    const [platillos, setPlatillos] = useState<Platillo[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
        fetch('/api/platillo')
            .then(response => response.json())
            .then(data => {
                setPlatillos(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const filteredPlatillos = platillos.filter(platillo => {
        return Object.keys(platillo).some(key =>
            String((platillo as any)[key]).toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Text fontSize='xl'>Platillos</Text>
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
                                    <TableCaption>Datos de Platillos</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Nombre</Th>
                                            <Th>Categoría</Th>
                                            <Th>Presentación</Th>
                                            <Th>Restaurante</Th>
                                            <Th>Precio</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredPlatillos.length > 0 ? (
                                            filteredPlatillos.map((platillo, index) => (
                                                <Tr key={index}>
                                                    <Td>{platillo.id_platillo}</Td>
                                                    <Td>{platillo.nombre}</Td>
                                                    <Td>{platillo.categoria}</Td>
                                                    <Td>{platillo.presentacion}</Td>
                                                    <Td>{platillo.restaurante}</Td>
                                                    <Td>{platillo.precio}</Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6}>No se encontraron resultados para "{searchTerm}"</Td>
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

export default Platillos;
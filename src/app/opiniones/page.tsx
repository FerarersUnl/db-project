'use client'

import type { Opinion } from '@/types/index'
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
    const [opiniones, setOpiniones] = useState<Opinion[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    function formatDate(isoTime: string) {
        const date = new Date(isoTime);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    }

    useEffect(() => {
        fetch('/api/opinion')
            .then(response => response.json())
            .then(data => {
                setOpiniones(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const filteredOpiniones = opiniones.filter(opinion => {
        return Object.keys(opinion).some(key =>
            String((opinion as any)[key]).toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Text fontSize='xl'>Listado de Opiniones</Text>
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
                                    <TableCaption>Listado de Opiniones</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>ID Platillo</Th>
                                            <Th>Nombre Platillo</Th>
                                            <Th>Categoria</Th>
                                            <Th>Presentacion</Th>
                                            <Th>Restaurante</Th>
                                            <Th>Precio</Th>
                                            <Th>Comentario</Th>
                                            <Th>Calificacion</Th>
                                            <Th>Fecha</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredOpiniones.length > 0 ? (
                                            filteredOpiniones.map((opinion, index) => (
                                                <Tr key={index}>
                                                    <Td>{opinion.id_platillo}</Td>
                                                    <Td>{opinion.platillo_nombre}</Td>
                                                    <Td>{opinion.categoria}</Td>
                                                    <Td>{opinion.presentacion}</Td>
                                                    <Td>{opinion.restaurante}</Td>
                                                    <Td>{opinion.precio}$</Td>
                                                    <Td>{opinion.comentario}</Td>
                                                    <Td>{opinion.calificacion}</Td>
                                                    <Td>{formatDate(opinion.comentario_fecha)}</Td>
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
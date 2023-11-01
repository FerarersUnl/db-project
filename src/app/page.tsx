'use client'

import {
    Box, useColorModeValue, Drawer, DrawerContent, Text,
    useDisclosure, List, ListItem, Stack, StatGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Divider, ListIcon, Tag, Avatar, TagLabel, Center
} from '@chakra-ui/react'
import MobileNav from '@/modules/MobileNav'
import SidebarContent from '@/modules/SidebarContent'
import { FiThumbsUp } from 'react-icons/fi'

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                <Stack spacing={8}>
                    {/* Metrics Summary */}
                    <Box p={5} borderWidth="1px">
                        <Text fontSize="xl">Métricas</Text>
                        {/* Add charts here */}
                        <Stat>
                            <StatLabel>Ganancias Actuales</StatLabel>
                            <StatNumber>$296,231</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                        <Divider p={5} />
                        <StatGroup>
                            <Stat>
                                <StatLabel>Envios</StatLabel>
                                <StatNumber>235</StatNumber>
                                <StatHelpText>
                                    <StatArrow type='increase' />
                                    23.36%
                                </StatHelpText>
                            </Stat>

                            <Stat>
                                <StatLabel>Usuarios Registrados</StatLabel>
                                <StatNumber>45</StatNumber>
                                <StatHelpText>
                                    <StatArrow type='decrease' />
                                    9.05%
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                    </Box>

                    {/* Recent Activity */}
                    <Box p={5} borderWidth="1px">
                        <List spacing={3}>
                            <Text fontSize="xl">Opiniones</Text>
                            <ListItem>
                                <ListIcon as={FiThumbsUp} color='green.500' />
                                ¡Esta app es increíble! La adoro.
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FiThumbsUp} color='green.500' />
                                Realmente estoy impresionado por la calidad de este servicio.
                            </ListItem>
                            <ListItem>
                                <ListIcon as={FiThumbsUp} color='green.500' />
                                ¡Excelente trabajo! Lo recomendaría encarecidamente a otros.
                            </ListItem>
                            {/* You can also use custom icons from react-icons */}
                            <ListItem>
                                <ListIcon as={FiThumbsUp} color='green.500' />
                                He estado usando esto por un tiempo y ha sido fantástico.
                            </ListItem>
                        </List>
                    </Box>

                    {/* To-Do List */}
                    <Box p={5} borderWidth="1px">
                        <List spacing={2}>
                            <Text fontSize="xl">Pendientes</Text>
                            {/* Add list items here */}
                            <ListItem alignContent={"center"}>
                                <Tag size='lg' colorScheme='red' borderRadius='full'>
                                    <Avatar
                                        src=''
                                        size='xs'
                                        name='Segun Adebayo'
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>Segun - Limpiar Base de datos</TagLabel>
                                </Tag>
                            </ListItem>
                            <ListItem>
                                <Tag size='lg' colorScheme='green' borderRadius='full'>
                                    <Avatar
                                        src=''
                                        size='xs'
                                        name='Armando Gonzalez'
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>Armando - Verificar Estatus</TagLabel>
                                </Tag>
                            </ListItem>
                            <ListItem>
                                <Tag size='lg' colorScheme='blue' borderRadius='full'>
                                    <Avatar
                                        src=''
                                        size='xs'
                                        name='Rodrigo Amezcua'
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>Rodrigo - Ordenar Almacen</TagLabel>
                                </Tag>
                            </ListItem>
                            <ListItem>
                                <Tag size='lg' colorScheme='yellow' borderRadius='full'>
                                    <Avatar
                                        src=''
                                        size='xs'
                                        name='Uriel Vazquez'
                                        ml={-1}
                                        mr={2}
                                    />
                                    <TagLabel>Uriel - Reiniciar Sistema</TagLabel>
                                </Tag>
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default Dashboard;
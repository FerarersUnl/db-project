'use client'

import { Box, CloseButton, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react'
import { FiUser, FiList, FiTruck, FiDatabase } from 'react-icons/fi'
import { IconType } from 'react-icons'
import NavItem from './NavItem'

interface SidebarProps extends BoxProps {
    onClose: () => void
}

interface LinkItemProps {
    name: string
    icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Platillos', icon: FiDatabase },
    { name: 'Repartidores', icon: FiTruck },
    { name: 'Clientes', icon: FiUser },
    { name: 'Ordenes', icon: FiList },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    CUCEITS
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

export default SidebarContent;
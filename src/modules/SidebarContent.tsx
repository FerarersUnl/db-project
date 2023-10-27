'use client'

import Link from 'next/link'
import { Box, CloseButton, Flex, useColorModeValue, Text, BoxProps } from '@chakra-ui/react'
import { FiUser, FiList, FiTruck, FiDatabase } from 'react-icons/fi'
import { IconType } from 'react-icons'
import NavItem from './NavItem'

interface SidebarProps extends BoxProps {
    onClose: () => void
}

interface LinkItemProps {
    href?: string
    name: string
    icon: IconType
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Platillos', icon: FiDatabase, href: '/platillos' },
    { name: 'Repartidores', icon: FiTruck, href: '/repartidores' },
    { name: 'Clientes', icon: FiUser, href: '/clientes' },
    { name: 'Ordenes', icon: FiList, href: '/ordenes' },
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
                <Link href='/'>
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
                        CUCEITS
                    </Text>
                </Link>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    )
}

export default SidebarContent;
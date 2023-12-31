'use client'

import { IconButton, Avatar, Flex, HStack, VStack, useColorModeValue, Text, FlexProps, Menu } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

interface MobileProps extends FlexProps {
    onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                CUCEITS
            </Text>
            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <HStack>
                            <Avatar
                                size={'sm'}
                            />
                            <VStack
                                display={{ base: 'none', md: 'flex' }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2">
                                <Text fontSize="sm">Administrador</Text>
                                <Text fontSize="xs" color="gray.600">
                                    Admin
                                </Text>
                            </VStack>
                        </HStack>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default MobileNav;
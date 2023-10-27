'use client'

import { Box, Flex, Icon, FlexProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
    href?: string
    icon: IconType
    children: React.ReactNode
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
    return (
        <Box
            as="a"
            href={href || '#'}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

export default NavItem;
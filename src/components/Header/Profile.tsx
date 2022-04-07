import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile ({showProfileData = true}: ProfileProps) {
    return (
        <Flex align='center'>
            { showProfileData && (
                    <Box mr='4' textAlign='right'>
                    <Text>Pedro Henrique</Text>
                    <Text color='gray.300' fontSize='small' >
                        pedromotoehm@gmail.com
                    </Text>
                </Box>
            ) }
        <Avatar size='md' name='Diego Fernandes' src='https://github.com/pedrokpdo.png'/>
    </Flex>
    )
}
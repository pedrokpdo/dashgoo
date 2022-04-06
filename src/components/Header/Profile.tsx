import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile () {
    return (
        <Flex align='center'>
        <Box mr='4' textAlign='right'>
            <Text>Pedro Henrique</Text>
            <Text color='gray.300' fontSize='small' >
                pedromotoehm@gmail.com
            </Text>
        </Box>
        <Avatar size='md' name='Diego Fernandes' src='https://github.com/pedrokpdo.png'/>
    </Flex>
    )
}
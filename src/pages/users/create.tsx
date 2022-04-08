import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import {useMutation} from 'react-query'
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigarorio'),
  email: yup.string().required('E-mail obrigarorio').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatoria').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const router = useRouter()

  const CreateUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date (),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })
  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await CreateUser.mutateAsync(values)

    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal' >Criar Usuario</Heading>
          <Divider my='6' borderColor='gray.700' />
          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                error={errors.name}
                name="name"
                label='Nome Completo'
                {...(register("name"))} />
              <Input
                name="email"
                error={errors.email}
                type='email'
                label='E-mail'
                {...(register("email"))} />
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                name="password"
                type='password'
                label='Senha'
                error={errors.password}
                {...(register("password"))} />
              <Input
                {...(register("password_confirmation"))}
                name="password_confirmation"
                type='password'
                error={errors.password_confirmation}
                label='Confirmação da Senha' />
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link passHref href='/users'>
                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button isLoading={formState.isSubmitting} type='submit' colorScheme='pink'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
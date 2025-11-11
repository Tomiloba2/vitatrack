import { Box, Button, Container, Flex, Image, Paper, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from '../../assests/logo.png'
import Hero from "../../assests/hero2.jpg"
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion"

export interface IResetPasswordProps {
}

/* --------------form type declaration ------------------- */

type formType = {
  password: string,
  confirmPassword: string

}

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const queryString = searchParams.get("token")
  console.log(queryString);
  

  const [visible, { toggle }] = useDisclosure(false) //toggle password visibility
  const [loading, loaderObject] = useDisclosure()
  const navigate = useNavigate()
  const formState = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: {
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : "Weak Password. Use 8+ characters with letters, numbers & symbols"),
      confirmPassword: (value, values) => (value === values.password ? null : "Password does not match")
    }
  })

  /* -------------------- form mutations -------------------------- */

  const handleResetPassword = useMutation({
    mutationFn: async (values: formType) => {
      loaderObject.toggle()
      try {
        const url = `${import.meta.env.VITE_SERVER}/reset-password`
        const data = await axios.post(url, { password: values.password, token: queryString })
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      loaderObject.close()
      notifications.show({
        title: 'success',
        message: "password successfully reset",
        color: 'green',
        position: "top-right"
      })
      navigate('/login')
    },
    onError: (error) => {
      loaderObject.close()
      notifications.show({
        title: 'failure',
        message: error instanceof AxiosError ? error.response?.data.error : error.message,
        color: 'red',
        position: "top-right"
      })
    }
  })

  return (
    <div>
      <Container>
        <Stack gap={40}>
          <nav>
            <Box pt={10} style={{
              cursor: "pointer"
            }}>
              <Image
                h={70}
                w={70}
                radius={100}
                src={Logo}
                alt="vita track logo "
                onClick={() => navigate('/')}
              />
            </Box>
          </nav>
          <Flex
            direction={{ base: "column", xs: "row" }}
            wrap={{ base: "wrap", xs: "nowrap" }}
            gap={"lg"}
            justify={"space-between"}
            align={"center"}
          >
            <Box visibleFrom="xs">
              <motion.section
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}>
                <Image
                  src={Hero}
                  w={{ xs: 280, sm: 400 }}
                  h={{ base: 350 }}
                  radius={"md"}
                  alt="female doctor reviewing maternal vital signs on a tablet in a hospital setting" />
              </motion.section>
            </Box>
            <motion.section
              initial={{ opacity: 0, x: 300 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }} >
              <form method="post" onSubmit={
                formState.onSubmit((values) => {
                  handleResetPassword.mutate(values)
                })} >
                <Box w={{ base: "70vw", xs: "40vw", md: "30vw", lg: "30vw", xl: "20vw" }} h={{ base: "60vh" }} style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Paper shadow="lg" p={"xl"} w={"100%"}>
                    <Text fw={700} size="xl" pb={'md'}>Reset Password</Text>
                    <Box style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "2rem"
                    }}>
                      <PasswordInput
                        label="Password"
                        placeholder="enter your password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        key={formState.key('password')}
                        {...formState.getInputProps('password')} />
                      <PasswordInput
                        label='Confirm Password'
                        placeholder="confirm password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        key={formState.key('confirmPassword')}
                        {...formState.getInputProps('confirmPassword')}
                      />
                      <Button
                        loading={loading}
                        type="submit"
                      >
                        sign in
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              </form>
            </motion.section>
          </Flex>
        </Stack>
      </Container>
    </div >
  );
}

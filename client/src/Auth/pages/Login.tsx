import { Box, Button, Checkbox, Container, Flex, Group, Image, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import Logo from "../../assests/logo.png"
import { Link, useNavigate } from "react-router-dom";
import Hero from "../../assests/login.png"
import { useDisclosure } from "@mantine/hooks";
import { useForm, isEmail, } from '@mantine/form';
import axios, { AxiosError } from 'axios'
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications"
import { motion } from "framer-motion"

export interface ILoginProps {
}

/* --------------form type declaration ------------------- */

type formType = {
  email: string;
  password: string;
  rememberMe: boolean;

}

export function Login() {
  const [visible, { toggle }] = useDisclosure(false) //toggle password visibility
  const [loading, loaderObject] = useDisclosure()
  const navigate = useNavigate()

  /* -------------- from validation using @mantine/form ------------------------ */

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validate: {
      email: isEmail("Invalid email address"),
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : "Weak Password. Use 8+ characters with letters, numbers & symbols")
    }
  })

  /* -------------------- form mutations -------------------------- */

  const handleLogin = useMutation({
    mutationFn: async (values: formType) => {
      loaderObject.toggle()
      try {
        const url = `${import.meta.env.VITE_SERVER}/login`
        const data = await axios.post(url, values)
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
        message: "Login successful",
        color: 'green',
        position: "top-right"
      })
      //navigate('/dashboard')
    },
    onError: (error) => {
      loaderObject.close()
      notifications.show({
        title: 'failure',
        message: error instanceof AxiosError ? error.response?.data.err : error.message,
        color: 'red',
        position: "top-right"
      })
    }
  })

  return (
    <div>
      <Container>
        <Stack gap={40}>
          {/* ------------------------- navigation bar--------------------------- */}
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
                viewport={{ once: true }}
              >
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
              viewport={{ once: true }}>
              <form method="post" onSubmit={
                form.onSubmit((values) => {
                  handleLogin.mutate(values)
                })}
              >
                <Box w={{ base: "70vw", xs: "40vw", md: "30vw", lg: "30vw", xl: "20vw" }} h={{ base: "60vh" }} style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Paper shadow="lg" p={"xl"} w={"100%"}>
                    <Text fw={700} size="xl" pb={'md'}>Sign In</Text>
                    <Box style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "2rem"
                    }}>
                      <TextInput
                        label="Email"
                        placeholder="enter your email"
                        key={form.key('email')}
                        {...form.getInputProps('email')} />
                      <PasswordInput
                        label='Password'
                        placeholder="enter your password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                      />
                      <Group justify="space-between">
                        <Checkbox
                          label="Remember Me"
                          key={form.key('rememberMe')}
                          {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                        />
                        <Link to="/forgot-password" style={{
                          textDecoration: "none",
                          color: "#4a90e2",
                          fontSize: "12px"
                        }}>Forgot password?</Link>
                      </Group>
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

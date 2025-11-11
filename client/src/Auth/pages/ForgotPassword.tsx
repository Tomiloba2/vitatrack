import { Box, Button, Container, Flex, Image, Paper, Stack, Text, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import Logo from "../../assests/logo.png"
import Hero from "../../assests/hero.png"
import { useDisclosure } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export interface IForgotPasswordProps {
}

/* --------------form type declaration ------------------- */

type formType = {
  email: string;

}

export function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, loaderObject] = useDisclosure()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: ""
    },
    validate: {
      email: isEmail("Invalid email address")
    }
  })


  /* -------------------- form mutations -------------------------- */

  const handleForgotPassword = useMutation({
    mutationFn: async (values: formType) => {
      loaderObject.toggle()
      try {
        const url = `${import.meta.env.VITE_SERVER}/forgot-password`
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
        message: "reset link has been sent to your mail",
        color: 'green',
        position: "top-right"
      })
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
                onClick={() => navigate('/')}
                h={70}
                w={70}
                radius={100}
                src={Logo}
                alt="vita track logo "
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
              viewport={{ once: true }}>
              <form method="post" onSubmit={form.onSubmit((values) => {
                handleForgotPassword.mutate(values)
              })} >
                <Box w={{ base: "70vw", xs: "40vw", md: "30vw", lg: "30vw", xl: "20vw" }} h={{ base: "60vh" }} style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Paper shadow="lg" p={"xl"} w={"100%"}>
                    <Text fw={700} size="xl" pb={'md'}>Forgot Password</Text>
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
                      <Button
                        loading={loading}
                        type="submit"
                      >
                        Forgot Password
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              </form>
            </motion.section>
          </Flex>

        </Stack>
      </Container>
    </div>
  );
}

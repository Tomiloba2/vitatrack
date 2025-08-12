import { Box, Button, Container, Flex, Image, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import Logo from "../../assests/logo.png"
import { useNavigate } from "react-router-dom";
import Hero from "../../assests/login.png"
import { useDisclosure } from "@mantine/hooks";
import { useForm, isEmail, } from '@mantine/form';
export interface ILoginProps {
}

export function Login() {
  const [visible, { toggle }] = useDisclosure(false) //toggle password visibility
  const navigate = useNavigate()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: isEmail("Invalid email address"),
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : "Weak Password. Use 8+ characters with letters, numbers & symbols")
    }
  }) // handle form state
  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    navigate('/dashboard')
  })

  return (
    <div>
      <Container>
        <nav>
          <Box p={10}>
            <Image
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
            <Image
              src={Hero}
              w={{ xs: 280, sm: 400 }}
              h={{ base: 350 }}
              radius={"md"}
              alt="female doctor reviewing maternal vital signs on a tablet in a hospital setting" />
          </Box>
          <section>
            <form method="post" onSubmit={handleSubmit} >
              <Box w={{ base: "70vw", xs: "40vw", md: "30vw", lg:"30vw", xl:"20vw" }} h={{ base: "60vh"}}  style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Paper shadow="lg" p={"xl"} w={"100%"}>
                  <Text fw={900} size="lg" pb={'md'}>Sign In</Text>
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
                    <Button
                      type="submit"
                    >
                      sign in
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </form>
          </section>
        </Flex>
      </Container>
    </div >
  );
}

import { Box, Button, Container, Flex, Image, Paper, PasswordInput, Text } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import Logo from '../../assests/logo.png'
import Hero from "../../assests/hero2.jpg"

export interface IResetPasswordProps {
}

export function ResetPassword() {
  const [visible, { toggle }] = useDisclosure(false) //toggle password visibility
  const navigate = useNavigate()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: {
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*?])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : "Weak Password. Use 8+ characters with letters, numbers & symbols"),
      confirmPassword: (value, values) => (value === values.password ? null : "Password does not match")
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
              <Box w={{ base: "70vw", xs: "40vw", md: "30vw", lg:"30vw", xl:"20vw" }} h={{ base: "60vh"}} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Paper shadow="lg" p={"xl"} w={"100%"}>
                  <Text fw={900} size="lg" pb={'md'}>Reset Password</Text>
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
                      key={form.key('password')}
                      {...form.getInputProps('password')} />
                    <PasswordInput
                      label='Confirm Password'
                      placeholder="confirm password"
                      visible={visible}
                      onVisibilityChange={toggle}
                      key={form.key('confirmPassword')}
                      {...form.getInputProps('confirmPassword')}
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

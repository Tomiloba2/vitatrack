import { Box, Button, Container, Flex, Image, Paper, Text, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import Logo from "../../assests/logo.png"
import Hero from "../../assests/hero.png"

export interface IForgotPasswordProps {
}

export function ForgotPassword() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: ""
    },
    validate: {
      email: isEmail("Invalid email address")
    }
  }) // handle form state
  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
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
                  <Text fw={900} size="lg" pb={'md'}>Forgot Password</Text>
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
                      type="submit"
                    >
                      Forgot Password
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </form>
          </section>
        </Flex>
      </Container>
    </div>
  );
}

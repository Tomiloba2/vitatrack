import { Feature } from "./comp/Features";
import { Hero } from "./comp/Hero";
import { NavBar } from "./comp/Nav";
import { Box, Container } from "@mantine/core";

export interface IHomeProps {
}

export function Home() {
  return (
    <Box bg={"clean-white.0"} c={"dark-gray.9"}>
      <Container>
        <section>
          <NavBar />
        </section>
        <section>
          <Hero />
        </section>
        <section></section>
        <section>
          <Feature />
        </section>
      </Container>
    </Box>
  );
}

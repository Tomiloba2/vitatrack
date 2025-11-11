import { Feature } from "./comp/Features";
import { Footer } from "./comp/Footer";
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
        </section><br />
        <section>
          <Hero />
        </section><br />
        <section></section>
        <section>
          <Feature />
        </section><br /><br />
        <section>
          <Footer/>
        </section>
      </Container>
    </Box>
  );
}

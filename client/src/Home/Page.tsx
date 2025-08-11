import { Feature } from "./comp/Features";
import { Hero } from "./comp/Hero";
import { NavBar } from "./comp/Nav";
import { Container } from "@mantine/core";

export interface IHomeProps {
}

export function Home() {
  return (
    <div>
      <Container >
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
    </div>
  );
}

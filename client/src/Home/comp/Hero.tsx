import hero from '../../assests/hero.png'
import {
    Image, Flex, Text, Button,
    Stack
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export interface IHeroProps {
}

export function Hero() {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/login')
    }
    return (
        <div>
            <Flex
                direction={{ base: "column", xs: "row" }}
                wrap={{ base: "wrap", xs: "nowrap" }}
                gap={"lg"}
                justify={"space-between"}
                align={"center"}
            >
                <section>
                    <Stack justify='center' align={'center'} style={{
                        textAlign:"center"
                    }}>
                        <Text fw={900} size='xl'>Empowering Care for Expectant Mothers</Text>
                        <Text size='sm'>
                            Vita track delivers real-time vital signs for pregnant patients securely to you.
                            Track their health, stay informed and act fast
                        </Text>
                        <Button onClick={handleClick} bg={"soft-blue"} w={{base:"50%",xs:"70%",sm:"40%"}}>Explore VitaTrack</Button>
                    </Stack>
                </section>
                <section>
                    <Image
                        src={hero}
                        w={{xs:300,sm:400}}
                        h={{base:350}}
                        radius={"md"}
                        alt="female doctor reviewing maternal vital signs on a tablet in a hospital setting" />
                </section>
            </Flex>
        </div>
    );
}

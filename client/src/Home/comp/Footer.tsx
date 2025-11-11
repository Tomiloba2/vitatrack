import { ActionIcon, Box, Group, Image, Text } from '@mantine/core';
import Logo from "../../assests/logo.png"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTwitter, FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa"

export interface IFooterProps {
}

export function Footer() {
    const navigate = useNavigate()
    const date = new Date()
    const actionIcons = [
        { icon: <FaInstagram />, id: 1 },
        { icon: <FaWhatsapp />, id: 2 },
        { icon: <FaLinkedinIn />, id: 3 },
        { icon: <FaTwitter />, id: 4 }

    ]
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            style={{
                textAlign: "center"
            }}>
            <Box style={{
                backgroundColor: "#cfd0d0",
                borderRadius: "10px"
            }}>
                <Box>
                    <Group justify='center'>
                        <Box p={10} style={{
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
                        <Text size='lg'>Vitatrack</Text>
                    </Group>
                    <Text size='sm'>Track real time vital signs of your patients, stayinformed and act fast</Text>
                </Box>
                <br />
                <hr />
                <Box>
                    <Text>
                        &copy;{date.getFullYear()} vitatrack. All rights reserved.
                    </Text>
                    <br />
                    <Group justify='center'>
                        {actionIcons.map((item) => (

                            <ActionIcon key={item.id}>
                                {item.icon}
                            </ActionIcon>
                        ))}
                    </Group><br />
                </Box>
            </Box>
        </motion.div>
    );
}

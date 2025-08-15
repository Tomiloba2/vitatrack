import { Avatar, Box, Flex, Image, Paper, Text, TextInput } from "@mantine/core";
import { MdMenu, MdSearch } from "react-icons/md";
import logo from '../../assests/logo.png'

export interface INavbarProps {
    isOpen: () => void
}

export function Navbar(props: INavbarProps) {
    const handleSearch = () => { }
    return (
        <div>
            <Paper p={'xs'}>
                <Flex
                    justify={'space-between'}
                    align={"center"}>
                    <Box>
                        <Image
                            h={35}
                            w={35}
                            radius={100}
                            src={logo}
                        />
                    </Box>
                    <Box hiddenFrom="xs"><MdMenu size={20} onClick={props.isOpen} /></Box>
                    <form action="" onSubmit={handleSearch}>
                        <TextInput
                            type='search'
                            placeholder='search by Name or ID'
                            rightSection={<MdSearch
                                size={20}
                                onClick={handleSearch}
                                cursor={"pointer"} />}
                            rightSectionPointerEvents='all' />

                    </form>
                    <Box>
                        <Avatar src={''} alt='doctors image'>IA</Avatar>
                        <Text size="xs" c={'dark-gray'}>Dr Issac</Text>
                    </Box>
                </Flex>
            </Paper>
        </div>
    );
}

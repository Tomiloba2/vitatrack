import { Avatar, Table, Pagination, Paper, Box } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles.module.css'

export interface IPatientsProps {
    lists: {
        img: string;
        initials: string;
        name: string;
        id: number;
        status: string;
        lM: string
    }[]
}

export function Patients(props: IPatientsProps) {
    const { lists } = props
    const navigate = useNavigate()

    //records to display on apage
    const [recordPerpage] = useState(6)
    //determing the number of pages
    const numberOfPages = Math.ceil(lists.length / recordPerpage)
    //current page number
    const [currentPage, setCurrentPage] = useState(1)
    //index of the last record
    const lastRecordIndex = currentPage * recordPerpage
    //index of the first rcord
    const firstRecordIndex = lastRecordIndex - recordPerpage
    //records to display by slicing the array
    const currentRecords = lists.slice(firstRecordIndex, lastRecordIndex)

    // filter function


    const rows = currentRecords.map((item) => (
        <Table.Tr key={item.id} onClick={() => navigate("/patient")} className={styles.tableRow}>
            <Table.Td>
                <Avatar src={item.img}>{item.initials}</Avatar>
            </Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.id}</Table.Td>
            <Table.Td c={`${item.status === "critical" ? "alert-red" : "success-green"}`}>{item.status}</Table.Td>
            <Table.Td>{item.lM}</Table.Td>
        </Table.Tr>
    ))
    return (
        <Paper shadow="sm" p={5} radius={'md'}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Image</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Health Status</Table.Th>
                        <Table.Th>Last Monitored</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Box style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Pagination siblings={1} total={numberOfPages} value={currentPage} onChange={setCurrentPage} pt={20} />
            </Box>
        </Paper>
    );
}

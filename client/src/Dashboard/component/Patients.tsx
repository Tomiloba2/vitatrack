import { Avatar, Table, Pagination, Paper, Box } from "@mantine/core";
import { useState } from "react";

export interface IPatientsProps {
}

export function Patients() {
    const lists = [
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
        { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
        { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
        { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    ]
    //records to display on apage
    const [recordPerpage] = useState(10)
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
    
    
    const rows = currentRecords.map((item) => (
        <Table.Tr key={item.id}>
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
                display:"flex",
                justifyContent:"center"
            }}>
                <Pagination siblings={1} total={numberOfPages} value={currentPage} onChange={setCurrentPage} pt={20}/>
            </Box>
        </Paper>
    );
}

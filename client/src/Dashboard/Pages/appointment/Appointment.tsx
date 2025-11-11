import { Box, Flex, Skeleton, Stack } from "@mantine/core";
import { Header } from "./comp/Header";
import { AppointmentForm } from "./comp/AppointmentForm";
import { AppointmentList } from "./comp/AppointmentList";
import { AppointmentStats } from "./comp/Stats";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAppointment } from "../../../Types/Appointments";


export interface IAppointmentProps {
}

export function Appointment() {

  /* -------fetch appointments--------------- */

  const { data: appointments, error, isLoading, isError } = useQuery({
    queryKey: ["fetch-appointments"],
    queryFn: async (): Promise<IAppointment[]> => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_SERVER}/get-appointments`)
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    }
  })

  return (
    <div>
      <Box>
        <Stack gap={20}>
          <Box>
            <Header />
          </Box>
          <Flex wrap={'wrap-reverse'} gap={20}>
            <Box>
              <AppointmentForm />
              {isLoading ? (
                <>
                  <Box style={{
                    height: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "center",
                    alignItem: "center"
                  }}>
                    <Skeleton height={20} width={'100%'} />
                    <Skeleton height={20} width={'100%'} />
                    <Skeleton height={20} width={'100%'} />
                    <Skeleton height={20} width={'100%'} />
                    <Skeleton height={20} width={'100%'} />
                  </Box>
                </>
              ) : isError ? (
                <>{error.message}</>
              ) : (
                <>
                  <AppointmentList appointments={appointments || []} />
                </>
              )}
            </Box>
            <Box>
              <AppointmentStats />
            </Box>
          </Flex>
        </Stack>
      </Box>
    </div>
  );
}

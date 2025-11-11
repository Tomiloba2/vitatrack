import { Box, Button, Group, Modal, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { MdCancel, MdCheck, MdEdit } from 'react-icons/md';
import { IAppointment } from '../../../../Types/Appointments';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

export interface IAppointmentListProps {
  appointments: IAppointment[]
}

export function AppointmentList(props: IAppointmentListProps) {
  const { appointments } = props

  /* -------- disclosure for loading state ----------- */

  const [edit] = useDisclosure(false)
  const [cancel, cancelObject] = useDisclosure(false)
  const [isComplete/* , isCompleteObject */] = useDisclosure(false)
  const [modal, modalObject] = useDisclosure(false)

  /* --------update appointment----------- */

  /* const updateAppiontment = useMutation({
    mutationKey: ['update-appointment'],
    mutationFn: async (id: string) => {
      try {
        const data = await axios.patch(`${import.meta.env.VITE_SERVER}/update-appointment/${id}`)
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      editObject.close()
      notifications.show({
        title: 'success',
        message: "appointment has been updated",
        color: 'green',
        position: "top-right"
      })
    },
    onError: (error) => {
      editObject.close()
      notifications.show({
        title: 'failure',
        message: error instanceof AxiosError ? error.response?.data.err : error.message,
        color: 'red',
        position: "top-right"
      })
    }
  }) */

  /* --------cancel appointment----------- */

  const cancelAppiontment = useMutation({
    mutationKey: ['cancel-appointment'],
    mutationFn: async (id: string) => {
      try {
        const data = await axios.delete(`${import.meta.env.VITE_SERVER}/cancel-appointment/${id}`)
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      cancelObject.close()
      notifications.show({
        title: 'success',
        message: "appointment has been cancelled successfully",
        color: 'green',
        position: "top-right"
      })
    },
    onError: (error) => {
      cancelObject.close()
      notifications.show({
        title: 'failure',
        message: error instanceof AxiosError ? error.response?.data.err : error.message,
        color: 'red',
        position: "top-right"
      })
    }
  })
  /* --------Mark appointment as complete----------- */

  /* const MarkAppiontment = useMutation({
    mutationKey: ['mark-appointment'],
    mutationFn: async (id: string) => {
      try {
        const data = await axios.patch(`${import.meta.env.VITE_SERVER}/complete-appointment/${id}`)
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      isCompleteObject.close()
      notifications.show({
        title: 'success',
        message: "appointment has been cancelled successfully",
        color: 'green',
        position: "top-right"
      })
    },
    onError: (error) => {
      isCompleteObject.close()
      notifications.show({
        title: 'failure',
        message: error instanceof AxiosError ? error.response?.data.err : error.message,
        color: 'red',
        position: "top-right"
      })
    }
  }) */
  return (
    <div>
      <Box>
        <Stack>
          {appointments !== undefined && appointments.map((item: IAppointment, index) => {
            return (
              <Paper key={index} shadow='lg' p={10}>
                <Group justify='space-between'>
                  <Box>
                    <Text>
                      {item.reason}
                    </Text>
                    <Text size='xs' fw={'lighter'}>
                      {item.dateTime && new Date(item.dateTime).toLocaleDateString()}
                    </Text>
                  </Box>
                  <Group>
                    <Button loading={edit} variant='outline' id='edit' size='xs'>
                      <MdEdit />
                    </Button>
                    <Button loading={cancel} onClick={modalObject.open} bg={"alert-red"} id='cancel' size='xs'>
                      <MdCancel />
                    </Button>
                    <Button loading={isComplete}
                      bg={item.isComplete ? "success-green" : ""}
                      id='complete'
                      size='xs'  >
                      <MdCheck />
                    </Button>
                  </Group>
                </Group>
                <Modal size='auto' opened={modal} onClose={modalObject.close} withCloseButton={true}>
                  <Text>
                    Are you sure you want to cancel this appointment scheduled for
                    {item.dateTime && new Date(item.dateTime).toLocaleDateString()}
                  </Text>
                  <Group>
                    <Button onClick={() => cancelAppiontment.mutate(item.id)}>Yes</Button>
                    <Button onClick={modalObject.close}>No</Button>
                  </Group>
                </Modal>
              </Paper>
            )
          })}
        </Stack>
        <Tooltip label='edit appointment' target='#edit' />
        <Tooltip label='cancel appointment' target='#cancel' />
        <Tooltip label='mark as complete' target='#complete' />
        <Tooltip label='incomplete appointment' target='#incomplete' />
      </Box>
    </div>
  );
}

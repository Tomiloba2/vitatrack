import { Box, Button, Grid, Text, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { toISO } from '../../../../libs/dateConverter';

export interface IAppointmentFormProps {
}

type formtype = {
  patientId: string,
  doctorId: string
  dateTime: string,
  reason: string
}

export function AppointmentForm() {
  const [loading, loaderObject] = useDisclosure(false)
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      patientId: "",
      doctorId: "",
      dateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      reason: ""
    },
    validate: {
      patientId: isNotEmpty("this field is required"),
      doctorId: isNotEmpty("this field is required"),
      dateTime: isNotEmpty("date and time is required"),
      reason: isNotEmpty("this field is required")

    }
  })

  const createAppointment = useMutation({
    mutationKey: ['create-appointments'],
    mutationFn: async (values: formtype) => {
      loaderObject.toggle()

      try {
        const url = `${import.meta.env.VITE_SERVER}/add-appointment`
        const { dateTime, ...val } = values
        const formatedDate = new Date(dateTime).toISOString()
        console.log(formatedDate);
        
        const data = await axios.post(url, {
          val,
          formatedDate
        })
        return data.data
      } catch (error) {
        console.error(error);
        throw error
      }
    },
    onSuccess: () => {
      loaderObject.close()
      notifications.show({
        title: 'success',
        message: "New appointment created",
        color: 'green',
        position: "top-right"
      })
    },
    onError: (error) => {
      loaderObject.close()
      notifications.show({
        title: 'failure',
        message: error.message,
        color: 'red',
        position: "top-right"
      })
    }

  })

  return (
    <div>
      <Box style={{
        border: "1px solid #e8e8e8",
        padding: "20px"
      }}>
        <Text size='md' fw={700}>New Appointment</Text>
        <br />
        <form method="post" onSubmit={form.onSubmit((values) => {
          createAppointment.mutate(values)
        })}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Patient ID"
                placeholder="enter patient's ID"
                key={form.key("patientId")}
                {...form.getInputProps("patientId")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Doctor ID"
                placeholder="doctor's ID"
                key={form.key("doctorId")}
                {...form.getInputProps("doctorId")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateTimePicker
                dropdownType='modal'
                label="Date & Time"
                placeholder="04/09/2025 09:45"
                presets={[
                  { value: dayjs().format("DD/MM/YYYY HH:mm"), label: "Today" },
                  { value: dayjs().add(1, "day").format("YYYY-MM-DD HH:mm"), label: "Tomorrow" },
                  { value: dayjs().add(2, "day").format("YYYY-MM-DD HH:mm"), label: "Next Tomorrow" },
                ]}
                key={form.key("dateTime")}
                {...form.getInputProps("dateTime")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Reason"
                placeholder="enter your email"
                key={form.key("reason")}
                {...form.getInputProps("reason")} />
            </Grid.Col>
          </Grid>
          <br />
          <Button loading={loading} type='submit'>
            Create Appointment
          </Button>
        </form>
      </Box>
    </div>
  );
}

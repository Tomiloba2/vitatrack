/* import { LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react'; */
import { /* Navigate, */ Outlet } from 'react-router-dom';

export interface IProtectedRoutesProps {
}


export function ProtectedRoutes() {
    /* const [visible] = useDisclosure(false)
    const fetchAuth = async (): Promise<any> => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_SERVER}/is-auth`)
            return data.data
        } catch (error) {
            console.error(error);
            throw error;

        }
    }
    const { data: session, isLoading, isError, error } = useQuery({
        queryKey: ['isAuth'],
        queryFn: fetchAuth,
    })
    useEffect(() => {
        notifications.show({
            title: 'failure',
            message: error instanceof AxiosError ? error.response?.data : error?.message,
            color: 'red',
            position: "top-right"
        })
    }, [isError])


    if (isLoading) {
        return (
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
        )
    } */

    return (
        <div>
            <Outlet />
            {/* {
                <>  {session && session?.name !== undefined ? <Outlet /> : <Navigate to={'/login'} />}</>
            } */}
        </div >
    );
}

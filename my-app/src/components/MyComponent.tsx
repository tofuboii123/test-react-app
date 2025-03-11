import { JSX } from "react";
import { useGetHockey } from "../api/getHockey";

export const MyComponent = () : JSX.Element => {
    const {isPending, error, data, isFetching} = useGetHockey();

    if (isPending || isFetching) return <>Loading...</>
    if (error) return <>{'Oops: ' + error.message}</>

    return <>{data.toString()}</>
}
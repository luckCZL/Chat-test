/** @format */

interface BussinessResType<T> {
    code: number;
    data: T;
    isSuccess: boolean;
    message: string;
    timestamp: number;
}
export default BussinessResType;

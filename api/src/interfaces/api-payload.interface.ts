/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiPayload<T = any> {
    status: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: T;
};

export default ApiPayload;

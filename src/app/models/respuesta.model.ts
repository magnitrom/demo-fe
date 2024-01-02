export interface Respuesta<T> {
    state: string,
    messages?: string[],
    data: T
}
export type Listener<T> = (data: T) => void;

export interface IEventEmitter<T> {
    on(event: string, listener: (data: T) => void): void;
    off(event: string): void;
    emit(event: string, data: T): void;
}
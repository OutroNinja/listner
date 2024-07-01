import { IEventEmitter, Listener } from "../interfaces/IEventEmitter";

export class EventEmitter<T> implements IEventEmitter<T> {
    private listeners: Map<string, Listener<T>[]> = new Map();

    on(event: string, listener: Listener<T>): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
    }

    off(event: string): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            this.listeners.set(
                event,
                eventListeners.filter(listener => listener !== listener)
            );

            if (this.listeners.get(event)!.length === 0) {
                this.listeners.delete(event);
            };
        }
    }

    emit(event: string, data: T): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach(listener => listener(data));
        }
    }
}
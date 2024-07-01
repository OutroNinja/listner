import { Listener } from "../interfaces/IEventEmitter";
import { IListManager } from "../interfaces/IListManager";
import { EventEmitter } from "./EventEmitter";

export class ListManager<T extends Record<string, any>> implements IListManager<T> {
    private items: T[] = [];
    private emitter: EventEmitter<T> = new EventEmitter();

    on(event: string, listener: Listener<T>): void {
        this.emitter.on(event, listener);
    }

    off(event: string): void {
        this.emitter.off(event);
    }

    insert(item: T): void {
        this.items.push(item);
        this.emitter.emit("insert", item);
    }

    insertMultiple(items: T[]): void {
        this.items.push(...items);
        items.forEach(item => this.emitter.emit("insert", item));
    }

    getAll(): T[] {
        return this.items;
    };

    getLength(): number {
        return this.items.length;
    }

    search(query: any): T | undefined {
        return this.items.find(item => {
            for (let key in query) {
                if (query[key] !== item[key]) {
                    return false;
                }
            }
            return true;
        })
    }

    searchAndUpdate(query: any, updateData: Partial<T>): T | undefined {
        const item = this.search(query);
        if (item) {
            Object.assign(item, updateData);
            this.emitter.emit("update", item);
        }
        return item;
    }

    searchAndDelete(query: any): T | undefined {
        const item = this.search(query);
        if (item) {
            this.items = this.items.filter(i => i !== item);
            this.emitter.emit("delete", item);
        }
        return item;
    }

    deleteAll(): void {
        const deletedItems = [...this.items];
        this.items = [];
        deletedItems.forEach(item => this.emitter.emit("delete", item));
    }

    delete(query: any): boolean {
        const item = this.searchAndDelete(query);
        return item !== undefined;
    }

    deleteMultiple(query: any): number {
        const deletedItems = this.items.filter(item => {
            for (let key in query) {
                if (query[key] !== item[key]) {
                    return false;
                }
            }
            return true;
        });

        this.items = this.items.filter(item => !deletedItems.includes(item));
        deletedItems.forEach(item => this.emitter.emit("delete", item));
        return deletedItems.length
    }

    update(query: any, updateData: Partial<T>): boolean {
        const item = this.searchAndUpdate(query, updateData);
        return item !== undefined;
    }

    updateMultiple(query: any, updateData: Partial<T>): number {
        const updatedItems = this.items.filter(item => {
            for (let key in query) {
                if (query[key] !== item[key]) {
                    return false;
                }
            }
            return true;
        });

        updatedItems.forEach(item => {
            Object.assign(item, updateData);
            this.emitter.emit("update", item);
        });
        return updatedItems.length;
    }

    getRandom(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * this.items.length);
        return this.items[randomIndex];
    }

    popRandom(): T | undefined {
        const randomIndex = Math.floor(Math.random() * this.items.length);
        return this.items.splice(randomIndex, 1)[0];
    }
}
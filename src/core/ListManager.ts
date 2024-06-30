import { IListManager } from "../interfaces/IListManager";

export class ListManager<T extends Record<string, any>> implements IListManager<T> {
    private items: T[] = [];

    insert(item: T): void {
        this.items.push(item);
    }

    insertMultiple(items: T[]): void {
        this.items.push(...items);
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
        }
        return item;
    }

    searchAndDelete(query: any): T | undefined {
        const item = this.search(query);
        if (item) {
            this.items = this.items.filter(i => i !== item);
        }
        return item;
    }

    deleteAll(): void {
        this.items = [];
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

        updatedItems.forEach(item => Object.assign(item, updateData));
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
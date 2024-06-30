export interface IListManager<T> {
    insert(item: T): void;
    insertMultiple(items: T[]): void;
    getAll(): T[];
    getLength(): number;
    search(query: any): T | undefined;
    searchAndUpdate(query: any, updateData: Partial<T>): T | undefined;
    searchAndDelete(query: any): T | undefined;
    deleteAll(): void;
    delete(query: any): boolean;
    deleteMultiple(query: any): number;
    update(query: any, updateData: Partial<T>): boolean;
    updateMultiple(query: any, updateData: Partial<T>): number;
    getRandom(): T | undefined;
    popRandom(): T | undefined;
}
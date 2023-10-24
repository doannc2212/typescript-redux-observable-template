type InventoryType = 'localStorage' | 'sessionStorage';

export default class Inventory<T = unknown> {
  private readonly key: string;

  private readonly inventoryType: InventoryType;

  constructor(key: string, storageType: InventoryType = 'localStorage') {
    this.key = key;
    this.inventoryType = storageType;
  }

  get(): T | null {
    try {
      const value = window[this.inventoryType].getItem(this.key) ?? '';
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  set(value: T): void {
    const strValue = JSON.stringify(value);
    window[this.inventoryType].setItem(this.key, strValue);
  }

  remove(): void {
    window[this.inventoryType].removeItem(this.key);
  }
}

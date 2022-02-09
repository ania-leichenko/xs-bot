interface IStorage {
  getItem(key: string): string | null;

  setItem(key: string, value: string): void;

  removeItem(key: string): void;
}

type Constructor = {
  storage: IStorage;
};

class Storage {
  #storage: IStorage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  getItem(key: string): string | null {
    return this.#storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }
}

export { Storage };

export type ScanKind = "text-scan" | "image-scan" | "link-check";

export type HistoryItem = {
  id: string;
  kind: ScanKind;
  createdAt: number;
  inputPreview: string;
  results: any; // keep flexible, your UI results object
};

const KEY = "expozia_history_v1";

function readAll(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(items: HistoryItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200))); // cap
}

export const historyStore = {
  list(kind?: ScanKind) {
    const all = readAll();
    return kind ? all.filter((x) => x.kind === kind) : all;
  },
  add(item: Omit<HistoryItem, "id" | "createdAt">) {
    const all = readAll();
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    writeAll([newItem, ...all]);
    return newItem;
  },
  clear(kind?: ScanKind) {
    if (!kind) return writeAll([]);
    const all = readAll().filter((x) => x.kind !== kind);
    writeAll(all);
  },
};
export {};

declare global {
  interface Window {
    electronAPI: {
      sendMessage: (channel: string, data: unknown) => void;
      onMessage: (channel: string, callback: (data: unknown) => void) => void;
      invoke: (channel: string, data?: unknown) => Promise<unknown>;
    };
  }
}
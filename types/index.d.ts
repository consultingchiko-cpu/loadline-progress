export interface LoadlineSettings {
  minimum?: number;
  easing?: string;
  positionUsing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
  showSpinner?: boolean;
  barSelector?: string;
  spinnerSelector?: string;
  parent?: string | Element;
  template?: string;
}

export type LoadlineEvent = 'start' | 'progress' | 'done' | 'fail' | 'remove';
export type LoadlineListener = (status?: number | null) => void;

interface LoadlineAPI {
  version: string;
  settings: LoadlineSettings;
  status: number | null;
  configure(options: LoadlineSettings): this;
  on(event: LoadlineEvent, listener: LoadlineListener): this;
  off(event: LoadlineEvent, listener?: LoadlineListener): this;
  set(value: number): this;
  isStarted(): boolean;
  start(): this;
  done(force?: boolean): this;
  fail(force?: boolean): this;
  inc(amount?: number): this;
  trickle(): this;
  promise<T>(promise: PromiseLike<T> | { state?: () => string; always: (callback: () => void) => void }): this;
  render(fromStart?: boolean): HTMLElement | null;
  remove(): void;
  isRendered(): boolean;
  getPositioningCSS(): string;
}

declare const Loadline: LoadlineAPI;
export = Loadline;

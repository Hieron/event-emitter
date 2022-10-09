interface EventEmitterInterface {
    on(name: string, callback: Function): void;
    off(name: string, callback?: Function): boolean;
    pause(name: string, callback?: Function): boolean;
    resume(name: string, callback?: Function): boolean;
    emit(name: string, ...values: unknown[]): boolean;
}

export default EventEmitterInterface
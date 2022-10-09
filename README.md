# Event Emitter

![Programing Language](https://img.shields.io/badge/TypeScript-@next-%233178C6?logo=typescript&logoColor=white)

This is a simple event emitter build with typescript that has **individual** off, pause and resume callbacks.


## Overview

```typescript
interface EventEmitterInterface {
    on(name: string, callback: Function): void;
    off(name: string, callback?: Function): boolean;
    pause(name: string, callback?: Function): boolean;
    resume(name: string, callback?: Function): boolean;
    emit(name: string, ...values: unknown[]): boolean;
}
```


## Basic Usage

```typescript
const eventEmitter = new EventEmitter()
const logCallback = (message: string) => console.log(message)

eventEmitter.on('log', logCallback)     //. Set one callback to the log event
eventEmitter.emit('log', 'Hello World') //. Emit log event
eventEmitter.pause('log')               //. Pause all log event callbacks
eventEmitter.resume('log')              //. Resume all log event callbacks
eventEmitter.off('log')                 //. Unset all log event callbacks
```

> To off, pause and resume individual callbacks pass the callback reference as second argument.
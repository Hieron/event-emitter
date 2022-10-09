import EventEmitterInterface from "./EventEmitterInterface"

class EventEmitter implements EventEmitterInterface {

    private events: {
        [key: string]: {
            paused: boolean,
            callbacks: {
                paused: boolean,
                callback: Function
            }[]
        }
    } = {}

    private asynchronous: boolean = false

    constructor(asynchronous?: boolean){

        if(typeof(asynchronous) === 'boolean'){
            this.asynchronous = asynchronous
        }

    }

    on(name: string, callback: Function){

        if(!this.events.hasOwnProperty(name)){

            this.events[name] = {
                paused: false,
                callbacks: []
            }

        }

        this.events[name].callbacks = this.events[name].callbacks.filter(item => item.callback !== callback)

        this.events[name].callbacks.push({
            paused: this.events[name].paused,
            callback: callback
        })

    }

    off(name: string, callback?: Function){

        if(!this.events.hasOwnProperty(name)){
            return false
        }

        if(callback){

            return this.events[name].callbacks.some((item, index) => {
                if(item.callback === callback){
                    this.events[name].callbacks.splice(index, 1)
                    return true
                }
            })

        }

        this.events[name].callbacks = []
        return true

    }

    pause(name: string, callback?: Function){

        if(!this.events.hasOwnProperty(name)){
            return false
        }

        if(callback){

            return this.events[name].callbacks.some(item => {
                if(item.callback === callback){
                    item.paused = true
                    return true
                }
            })

        }

        this.events[name].paused = true
        
        this.events[name].callbacks.forEach(item => {
            item.paused = true
        })

        return true

    }

    resume(name: string, callback?: Function){

        if(!this.events.hasOwnProperty(name)){
            return false
        }

        if(callback){

            return this.events[name].callbacks.some(item => {
                if(item.callback === callback){
                    item.paused = false
                    return true
                }
            })

        }

        this.events[name].paused = false

        this.events[name].callbacks.forEach(item => {
            item.paused = false
        })

        return true

    }

    emit(name: string, ...values: unknown[]){

        if(!this.events.hasOwnProperty(name)){
            return false
        }
    
        if(this.events[name].paused){
            return false
        }
    
        this.events[name].callbacks.forEach(item => {

            if(item.paused){
                return
            }
        
            if(this.asynchronous){

                const promise = new Promise( resolve => resolve(null) )
                promise.then(()=>{ 
                    item.callback.call(this, ...values)
                })
                return
                
            }
    
            item.callback.call(this, ...values)
    
        })
    
        return true

    }

}

export default EventEmitter
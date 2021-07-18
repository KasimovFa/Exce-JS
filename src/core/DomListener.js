import { capitalize } from "./utils";

export class DomListener {
    constructor($root, listerners = []) {
      if (!$root) {
        throw new Error('No $root provided for DomListener')
    }
     this.$root = $root;
     this.listerners = listerners;
    }


    initDOMListeners() {
     this.listerners.forEach((listerner, i) => {
     // список все событий  this.listerners. Если написать function вместо стрелячной функции this.$root не будет найден
        const methood = getMethodName(listerner);
        if (!this[methood]) {
          throw new Error(`Method ${methood} is not implemented in ${this.name} `)
        }
        this[methood] = this[methood].bind(this)
       // это тоже самое,что и addEventListener
       this.$root.on(listerner, this[methood])
       //this.$root.on(listerner, this[methood].bind(this))
     })
    }

    removeDOMListeners() {
      this.listerners.forEach((listerner, i) => {
        const methood = getMethodName(listerner);
        this.$root.off(listerner, this[methood])
        //console.log( listerner, this[methood]);
      })
}
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listerners)
        this.name = options.name || ''
    }
    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}
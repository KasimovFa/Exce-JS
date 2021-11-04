import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listerners)
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubscribers = [];
        this.prepare();

    }
    // Настроиваем наш компонент до init
    prepare() {}
    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    //Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    //Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    //Инициазируем компонент
    // Добавляем dom слушателей
    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub);
    }
}
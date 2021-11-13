import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listerners)
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubscribers = [];
        this.prepare();

    }
    // Настроиваем наш компонент до init
    prepare() {}
    //Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Сюда приходят только изменения по тем полям, на которые мы подписались

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
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

    $dispatch(action) {
        this.store.dispatch(action);
    }

   /* $getState() {
        return this.store.getState();
    }*/

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
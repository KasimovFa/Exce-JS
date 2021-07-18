import {$} from '../../core/dom'

// воедино объединяет наши классы Header,Formula...Создает Dom дерево
export class Excel {
  constructor(selector, options) { //selector = #app,options =  components:[Header, Toolbar, Formula, Table] наши классы
      this.$el = $(selector)//приватное преременная
      this.components = options.components || []
}
  getRoot() {
   const $root =$.create('div', 'excel');

   //добаавляем наши компоненты в блок excel
   this.components = this.components.map(Component => { //перебираем компоненты т.е. классы Toolbar,Formula и.т.д
      const $el = $.create('div', Component.className); //div.excel__formula...
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      console.log(component)
       return component;
    });
    return $root;
  }

  //
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => {
      component.init()
    });
  }
}
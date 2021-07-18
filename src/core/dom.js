class Dom {
    constructor(selector) {
      this.$el = typeof selector == 'string'
      ? document.querySelector(selector)
      :selector;
    }

    html(html) {
       if (typeof html === "string") {
           this.$el.innerHTML = html;
           return this;
       }
       return this.$el.outerHTML.trim(); //удаляет лишние пробелы в начале и в конце
    }

    clear() {
        this.html();
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    append(node) {
      if (node instanceof Dom) {
          node = node.$el;
      }
     if (Element.prototype.append) { //если такой метод присутствует в базавом классе Element
        this.$el.append(node);
     } else {
         this.$el.appenChild(node);
     }
     return this;
   }
}

//создаем экземпляр на основе класса Dom
export function $(selector) {
    return new Dom(selector)
}

//формируем блоки div c компонентами. Пример:tagname = div, classes = Formula. На выходе:div.excel__formula...
$.create = (tagName, classes) => {
   const el = document.createElement(tagName);
   if (classes) {
       el.classList.add(classes);
   }
   return $(el)
}
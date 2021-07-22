import { $ } from "../../core/dom";

function FilterRow(row, letter) {
   const arr = [...row].filter(el => {
    if (el.dataset.col === letter) {
        return el;
     }
    });
    return arr;
 }

 export function ReziseHandler(event) {
        let $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const letter = $parent.$el.dataset.col;
        const row = document.querySelectorAll('.cell');
        const type = event.target.dataset.resize;
        let value = 0;
        const arr = FilterRow(row, letter);

      document.onmousemove = e => {
        if (type === 'col') {
        const delta = e.pageX - coords.left;
        $resizer.css({left:delta + 'px'});
        value = delta;
      } else {
        const delta = e.clientY- coords.top;
        $resizer.css({top:delta + 'px'});
        value = delta;
      }
    }
    document.onmouseup = (e) => {
        if (type === 'col') {
          document.onmousemove = null;
          document.onmouseup = null;
          arr.forEach(el => {
            $(el).css({
              width: value + 'px'
          });
        });
          $parent.css({
            width: value + 'px'
         });
         $resizer.css({opacity:0});

        } else {
          document.onmousemove = null;
          document.onmouseup = null;
          $parent.css({
             height:value + 'px'
          });
          $resizer.css({opacity:0});
        }
      };
 }
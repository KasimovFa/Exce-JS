import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import * as actions from '../../redux/actions';
import {applyStyles, changeStyles} from "../../redux/actions";
import {defaultStyles} from "../../constants";
import {parse} from "../../core/parse"; //импортировать как переменную actions

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
       name: "Table",
       listerners: ['mousedown', 'keydown', 'input'],
       ...options
    })
     this.unsubs = [];
     this.rowsCount = 20;
  }

  toHTML() {
    return createTable(this.rowsCount, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.selectCell($cell)
    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value);
      this.selection.current.text(parse(value))
      this.updateTextInStore(value)
    });

    this.$on('formula:done', () => {
      this.selection.current.focus()
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyles({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles), defaultStyles);
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
       const data = await resizeHandler(this.$root, event);
       this.$dispatch(actions.ResizeTable(data));
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
       this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target)
      }
    }
    this.selectCell($(event.target))
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
      this.selectCell($next)
    }
  }


  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  destroy() {
    super.destroy();
    this.unsubs.forEach(unsub => unsub() )
  }
}


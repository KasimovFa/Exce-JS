import {ExcelComponent} from "../../core/ExcelComponent"
import {changeDate, changeTitle} from "../../redux/actions";
import {defaultTitle} from "../../constants";
import {debounce} from "../../core/utils";
import {$} from "../../core/dom";
import {ActiveRoute} from "../../core/routes/ActiveRoute";


export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listerners: ['input', 'click'],
      ...options
    })
    this.page = null;
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }


  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value=${title} />

    <div>

       <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

    </div>
    `
  }

  onClick(event) {
    const $btn = event.target.innerText;
    if ($btn === 'exit_to_app') {
      ActiveRoute.navigate('');
    }
    if ($btn === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param[1]);
        ActiveRoute.navigate('')
      }
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
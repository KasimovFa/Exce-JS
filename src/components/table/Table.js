import {
  ExcelComponent
} from "../../core/ExcelComponent";
import {
  createTable
} from "./table.template";
import { ReziseHandler } from "./table.resizer";

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listerners: ['mousedown']
    });
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      ReziseHandler(event);
    }
  }
}
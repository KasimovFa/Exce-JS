const CODES = {
    A:65,
    Z:90
}

function createCell(c) {
    return `
     <div class="cell" contenteditable="" data-col="${c}"></div>
    `

}


function createCol(el) {
    return `
    <div class="column" data-type="resizable" data-col = ${el}>
    ${el}
    <div class="col-resize"  data-resize="col"></div>
    </div>
    `
}

function createRow(content, index) {
   const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
   return `
   <div class="row" data-type="resizable">
   <div class="row-info">
   ${index ? index : ''}
   ${resizer}
    </div>
   <div class="row-data">${content}</div>
   </div>
   `
}

export function createTable(rowsCount = 20) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => {
        return String.fromCharCode(CODES.A + index);
    })
    .map(el => {
        return createCol(el);
    })
    .join('');
    rows.push(createRow(cols, ''));

    let code = CODES.A;

    for (let i = 1; i <= rowsCount; i++) {
       const colsc = new Array(colsCount)
       .fill('')
       .map((_el, j) => {
         return createCell(String.fromCharCode(CODES.A+j))
       })
       .join('');
       rows.push(createRow(colsc, i));
    }
     return rows.join('');
 }

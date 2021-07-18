const CODES = {
    A:65,
    Z:90
}

function createCell(el) {
    return `
     <div class="cell" contenteditable="">${el}</div>
    `

}


function createCol(el) {
    return `
    <div class="column">
    ${el}</div>
    `
}

function createRow(content, index) {
   return `
   <div class="row">
   <div class="row-info">${index}</div>
   <div class="row-data">${content}</div>
   </div>
   `
}

export function createTable(rowsCount = 5) {
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
         return createCell('')
       })
       .join('');
       rows.push(createRow(colsc, i));
    }
     return rows.join('');
 }

import {APPLY_STYLE, CHANGE_DATE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from "./type";

export function ResizeTable(data) {
    return {
        type:TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type:CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type:CHANGE_STYLES,
        data
    }
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}

export function changeDate(data) {
    return {
        type: CHANGE_DATE,
        data
    }
}

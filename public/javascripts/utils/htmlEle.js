//E : element
//ES : element + style

const ELEMENT = {
    DIV_P:'<div>',
    DIV_E:'</div>',
};

function E_DIV(t){
    return ELEMENT.DIV_P+t+ELEMENT.DIV_E;
}
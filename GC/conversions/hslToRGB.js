'use strict';

import setFixed2 from "../utils/setFixed2.js";

        /**
         * função que comverte HSL para RGB
         * @param {array} hsl - recebe um array com uma cor HSL 
         * @example - exemplo: hslToRGB([0, 0, 95]); -> retorna [242, 242, 242]
         * @returns - Retorna um array com valores RGB: [R, G, B]
         */
export default function hslToRGB(hsl) {
    //hsl -> saturação e iluminação
    let s = hsl[1]/100,
     l = hsl[2]/100;

    //intensidade da cor
     const c = (1 - Math.abs(2 * l - 1)) * s;
     const x = c * (1 - Math.abs(((hsl[0] / 60) % 2) - 1));
     const m = l - c / 2;



     let r = 0, g = 0, b = 0;

     //Tabela complexa
     let h = hsl[0];

     if (h < 60) {
         r=c; g=x;
     } else if (h < 120) {
        r=x; g=c;
     } else if (h < 180) {
         g=c; b=x; 
     } else if (h < 240) {
         g=x; b=c;
     } else if (h < 300) {
        r=x; b=c;
     } else {
        r=c;  b=x;
     };

     return [setFixed2((r + m) * 255, 0), setFixed2((g + m) * 255, 0), setFixed2((b + m) * 255, 0)];

};


'use strict';

import setFixed2 from "../utils/setFixed2.js";


/**
 * Função, que comverte um valor rgb para hsl
 * @param {string} rgb - string com cor rgb, ex: rgb(125, 125, 125);
 * @returns {array} - retorna um array, com rgb comvertido para hsl [H, S, L]
 */
export default function rgbToHSL(rgb) {
    const rgbF = rgb.match(/\d+/g).map(Number);

    //Normaliza os valores
    let normal = rgbF.map((item) => {
        return (item / 255);
    });

    //Objeto com operações de comversão para hsl
    let hsl = {
        brightness: (Math.max(...normal) + Math.min(...normal)) / 2,
        get saturation() {
            let max = Math.max(...normal);
            let min = Math.min(...normal);
            if (max === min) {
                return 0;
            } else if (this.brightness <= 0.5) {
                return (max - min) / (max + min);
            } else {
                return ((max - min) / (2 - (max + min)));
            }
        },
        get matiz() {
            let max = Math.max(...normal);
            let min = Math.min(...normal);
            if (max === min) {
                return 0;
            } else if (max === normal[0]) {
                return (60 * ((normal[1] - normal[2]) / (max - min)) + 360) % 360;
            } else if (max === normal[1]) {
                return (60 * ((normal[2] - normal[0]) / (max - min) + 2) + 360) % 360;
            } else if (max === normal[2]) {
                return (60 * ((normal[0] - normal[1]) / (max - min) + 4) + 360) % 360;
            }
        },
    };

    return [setFixed2(hsl.matiz), setFixed2((hsl.saturation * 100)), setFixed2((hsl.brightness * 100), 5)];
};
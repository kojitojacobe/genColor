'use strict';
import hslToRGB from "./hslToRGB.js";

/**
 * Função para comverter cor hSL em HEX
 * @param {array} hsl - Recebe um array com cor hsl 
 * @example - exemplo, hslToHEX([0, 0, 95]) -> retorna '#f1f1f1'
 * @returns - retorna uma string com cor hex
 */
export default function hslToHEX(hsl) {
    let rgb = hslToRGB(hsl); // comverte o array HSL para um array RGB
    const hex = {
        r: rgb[0].toString(16).padStart(2, '0'),
        g: rgb[1].toString(16).padStart(2, '0'),
        b: rgb[2].toString(16).padStart(2, '0')
    }
    return `#${hex.r}${hex.g}${hex.b}`;

};
'use strict';

import { antiLeak, } from "../../../../utils/Security/AntiLeake/antiLeakageColors.js";
import setFixed2 from "../../../../utils/setFixed2.js";


/**
 * Função que tenta simula o hdr, aplicando uma formula Smooth Step
 * @param {array} hsl - array com cor HSL
 * @param {object} palet - Paleta, modificada
 * @param {number} key - chave de um loop for, que aumenta +50, a cada loop(9 loops = 400)
 * @example - Exemplo: hdr([50, 50, 50]) -> retorna [ 50, 58, 50 ]
 * @returns {array} - retorna um novo array com efeito HDR aplicado
 */
export default function hdr(hsl, palet, key) {
    const G = 0.15;

    const X = hsl[2] / 100;
    const S = X * X * (3 - 2 * X);
    const T = 0.9; // valor de influencia, modifique caso queira efeitos mais visiveis


    return [hsl[0], setFixed2(antiLeak(hsl[1]  + (100 - hsl[1]) * G), 0), setFixed2(antiLeak(hsl[2] + (S * 100 - hsl[2]) * T), 0)];
};
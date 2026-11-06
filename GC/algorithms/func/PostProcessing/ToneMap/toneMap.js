'use strict';

import { antiLeak } from "../../../../utils/Security/AntiLeake/antiLeakageColors.js";
import setFixed2 from "../../../../utils/setFixed2.js";


/**
 * Função que tenta simular tonemap, limitando a iluminação a 10min 90max, usando a formula de Smooth Step
 * @param {array} hsl - array com cor hsl
 * @param {object} palet - Paleta, modificada
 * @param {number} key - chave de um loop for, que aumenta +50, a cada loop(9 loops = 400)
 * @example - Exemplo: tonemap([50, 100, 100]) -> retorna  [ 50, 100, 90 ]
 * @returns {array} - retorna um array com efeito tonemap aplicado
 */
export default function tonemap(hsl, palet, key) {
    //Formula de Smooth Step
    const MIN = 10; //ajuste caso queira efeitos mais visiveis
     const MAX = 90;

     const X = hsl[2] / 100;
     const S = X * X * (3 - 2 * X);
    return [hsl[0], antiLeak(setFixed2(hsl[1], 0)), setFixed2(antiLeak(MIN + S * (MAX - MIN)), 0)];
};
'use strict';
import { antiLeak } from "../../../utils/Security/AntiLeake/antiLeakageColors.js";


/**
 * Função para aumentar a iluminação(HSL)
 * @param {number} l - l = Iluminação, recebe o valor da iluminação de um array hsl 
 * @param {number} t - e o ajuste, indo de 0 a 1 
 * @example - luminance(50, 0.42) -> retorna a iluminação ajustada, para 71
 * @returns - retorna o novo valor de iluminação modificado
 * 
 */
export const luminance = (l, t) => {
    return  antiLeak(l + (100 - l) * t);
};

/**
 * Função para diminuir a iluminação(hsl)
 * @param {number} l - l = Iluminação, recebe o valor da iluminação de um array hsl 
 * @param {number} t - e o ajuste, indo de 0 a 1
 * @example - darkness(50, 0.42) -> retorna a iluminação ajustada, para 29
 * @returns - retorna o novo valor de iluminação modificado
 */
export const darkness = (l, t) => {
    return antiLeak(l * (1 - t));
};

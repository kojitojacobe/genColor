'use strict';
import { antiLeak } from "../../../utils/Security/AntiLeake/antiLeakageColors.js";

/**
 * Função para modificar a saturação(HSL)
 * @param {number} s - s = Saturação de hsl
 * @param {number} t - valor de ajuste, de 0 a 1
 * @example - exemplo: saturation(50, 0.30) -> retorna 65
 * @returns - retorna a Saturação modificada
 */
export const saturation = (s, t) => {
    return antiLeak(s + (100 - s) * t);
};

/**
 * Função para baixar a saturação(HSL)
 * @param {number} s -  s = Saturação de hsl
 * @param {number} t -  valor de ajuste, de 0 a 1
 * @example - exemplo: deSaturation(50, 0.30) -> retorna 35
 * @returns - retorna a saturação modificada
 */
export const deSaturation = (s, t) => {
    return antiLeak(s * (1 - t));
};
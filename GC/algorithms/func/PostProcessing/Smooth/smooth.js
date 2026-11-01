'use strict';
import { luminance } from "../../Luminance/Luminance.js";
import { antiLeak } from "../../../../utils/Security/AntiLeake/antiLeakageColors.js";
import setFixed2 from "../../../../utils/setFixed2.js";

/**
 * Função para suavizar cores HSL, aumentando a iluminação
 * @param {array} hsl - array com cor hsl 
 * @example - Exemplo: smooth([50, 50, 50]) -> retorna [50, 50, 55]
 * @returns {array} retorna um array com efeito de suavização aplicado
 */
export default function smooth(hsl) {
    const WEIGHT = 0.09; //ajuste caso queira efeito mais forte
    return [hsl[0], hsl[1], setFixed2(antiLeak(luminance(hsl[2], WEIGHT + (0.2 / hsl[2]))), 0)];
};
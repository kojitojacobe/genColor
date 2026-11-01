'use strict';
import { antiLeakHue } from "../../../utils/Security/AntiLeake/antiLeakageColors.js";


/**
 * função para modificar graus do Hue(HSL)
 * @param {number} h - h = Hue do hsl 
 * @param {number} g - g = graus, quantidade de graus que ira acrescenter em Hue, aceita valor negativo
 * @example - exemplo, matiz(355, -30) -> retorna 325 
 * @returns - retorna o Hue modificado
 */
export default function matiz (h, g) {
    return antiLeakHue((h + g + 360) % 360);
}; 
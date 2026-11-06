'use strict';

/**
 * Função para, descobrir o tipo de cor(hex, rgb, hsl)
 * @param {object} entry - objeto com configuração de entrada 
 * @returns {string} - retorna uma string validativa
 */

export default function identifierEntry(entry) {
    //RegHex de verificação
    const isHex = /^#[0-9A-Fa-f]{6}$/;
    const isRGB = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/i;
    const isHSL = /^hsl\(\s*(360|3[0-5]\d|[12]?\d?\d)\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/i;

    const thisEntry = entry.color.toLowerCase();

    if (isHex.test(thisEntry)) {
        return 'hex';
    } else if (isRGB.test(thisEntry)) {
        return 'rgb';
    } else if (isHSL.test(thisEntry)) {
        return 'hsl';
    } else {
        return 'error';
    };
}; 
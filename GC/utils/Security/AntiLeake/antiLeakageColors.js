'use strict';
/**
 * 
 * @param {number} - valor numerico(HSL) 
 * @returns - retorna um alerta, indicando o erro
 */
const warn = (v) => console.warn("AntiLeak: valor invalido", v);


/**
 * Função de proteção, contra vazamento de cores, valores NaN e erros estranhos(HSL)
 * @param {number} value - valor numerico(HSL) 
 * @param {*} max - limite numerico da operação, por padrão em 100(para Iluminação e Saturação)
 * @example - exemplo: antiLeak(hsl[2] + 200) -> retorna o valor arredondado para 100, protegendo a cor(HSL)
 * @returns - retorna o valor, dentro do limite estabelecido
 */
export function antiLeak(value, max=100, ) {
    if (!Number.isFinite(value)) {
        warn(value);
        return 0;
    }
    return Math.max(0, Math.min(value, max));
};

/**
 * Função para proteção contra operações invalidas com hue(HSL)
 * @param {number} hue - valor hue(HSL)
 * @example - exemplo: antiLeakHue(300 + 'a') -> 'AntiLeak: valor invalido 300a 0' retornando 0
 * @returns - retorna o valor hue protegido, contra NaN, e erros estranhos(HSL)
 */
export function antiLeakHue(hue) {
    if (!Number.isFinite(hue)) {
        warn(hue);
        return 0;
    };
    return ((hue % 360) + 360) % 360;
};
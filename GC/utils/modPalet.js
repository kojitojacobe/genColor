'use strict';
/**
 * Função, semelhante ao map, mais esta pecorre um objeto, modificando valores com chave de 0 a 400, subindo +50 a cada loop, indo ate a chave 400
 * @param {Object} genPalet - Objeto que a função ira percorrer 
 * @param {Function} mod - função que sera aplicada em cada propiedade do objeto 
 * @param {number} sizeObject - tamaho do objeto que deve percorrer e modificar, indo de 50 a 50 de acordo com as chaves, por padrão em 400
 * @throws - E uma função interna, usada para percorrer o objeto com paletas de cores geradas, e aplicar funções nela
 * @returns - retorna um novo objeto, com a função callback, aplicada em cada chave(0 a 400, subindo +50 a cada loop)
 */
export default function mapPalet(genPalet, mod, sizeObject=400) {
    let modPalet = {};
    for (let i = 0; i <= sizeObject;i += 50) {
        modPalet[i] = mod(genPalet[i]);
    };
    return modPalet;
};
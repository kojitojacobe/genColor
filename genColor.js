'use strict';

//Headers
import hexToHSL from "./GC/conversions/hexToHSL.js";
import defaultPallet from "./GC/algorithms/default.js";
import vibrantPalet from "./GC/algorithms/vibrant.js";
import genPaletMonocromatic from "./GC/algorithms/monocrome.js";
import identifierEntry from "./GC/utils/IdentifyTypeEntryColor.js";
import rgbToHSL from "./GC/conversions/rgbToHSL.js";

/**
 *
 * @param {Object} config - objeto com configurações de geração da cor base
 * @returns {object} - retorna um objeto com arrays da variante de cor, da configuração, além de um objeto com informações de depuração
 * @author - Kojito Jacobe
 * @example - {color:'#f1f1f1',mode:'default',postProcessing:[],colorOutput:'rgb'}
 *
 */
export default function genColor(config) {
    //API refeita, para suportar entradas, rgb  e hsl
    const postProcessingLower = config.postProcessing.map(item => item.toLowerCase());
    //Informações para depuração
    const debug = { postProcessing: config.postProcessing, colorOutput: config.colorOutput, inputColor: config.color, modeGen: config.mode };


    /**
     * Função, que aplica uma paleta de cores, com base no modo escolhido
     * @param {array} colorHSL - Array, com valores hsl
     * @returns {object} - retorna um Objeto, com a paleta inteira de cores geradas
     */
    function colorMode(colorHSL) {
        let typeMode = config.mode.toLowerCase();

        if (typeMode === 'default') {
            let result = defaultPallet(colorHSL, postProcessingLower, config.colorOutput);
            result.debug = debug;
            return result;
        } else if (typeMode === 'monocromatic') {
            let result = genPaletMonocromatic(colorHSL, postProcessingLower, config.colorOutput);
            result.debug = debug;
            return result;
        } else if (typeMode === 'vibrant') {
            let result = vibrantPalet(colorHSL, postProcessingLower, config.colorOutput);
            result.debug = debug;
            return result;
        } else {
            throw new Error(`Erro !! modo ${config.mode} invalido !, modos validos: default, monocromatic, vibrant`)

        }
    };


    //Verificar tipos de entrada
    if (identifierEntry(config) === 'hex') {
        return colorMode(hexToHSL(config.color));

    } else if (identifierEntry(config) === 'hsl') {
        const hslValue = config.color;
        const hslValid = hslValue.match(/[\d.]+/g).map(Number);

        return colorMode(hslValid)

    } else if (identifierEntry(config) === 'rgb') {
        let hslArray = rgbToHSL(config.color);
        return colorMode(hslArray)

    } else if (identifierEntry(config) === 'error') {
        throw new Error(`Erro, formato de cor de entrada '${config.color}', invalido !`)
    }


}
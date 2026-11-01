'use strict';

//Headers
import hexToHSL from "./GC/conversions/hexToHSL.js";
import defaultPallet from "./GC/algorithms/default.js";
import vibrantPalet from "./GC/algorithms/vibrant.js";
import genPaletMonocromatic from "./GC/algorithms/monocrome.js";

/**
 * 
 * @param {Object} config - objeto com configurações de geração da cor base
 * @returns {object} - retorna um objeto com arrays da variante de cor, da configuração, além de um objeto com informações de depuração
 * @author - Kojito Jacobe
 * @example - {color:'f1f1f1',mode:'default',postProcessing:[],colorOutput:'rgb'}
 * 
 */
export default function genColor(config) {

    /**
     * 
     * @param {string} value -  recebe uma string com uma cor hex extendida
     * @returns - retorna um boleano, validando a string de entrada
     */
    function isHex(value) {
        if (typeof value !== 'string') {
            return false;
        }
        return /^#[0-9a-f]{6}$/i.test(value);
    };

    //Verificação de cor hex valida, é modo de cor, para aplicar
    if (isHex(config.color)) {

        let colorHSL = hexToHSL(config.color.toLowerCase());

        const output = config.colorOutput.toLowerCase();

        const postProcessingLower = config.postProcessing.map(item => item.toLowerCase());

        //Informações para depuração
        const debug = { postProcessing: config.postProcessing, colorOutput: config.colorOutput, inputColor: config.color, modeGen: config.mode };

        if (config.mode.toLowerCase() === 'default') {
            let defaultColors = defaultPallet(colorHSL, postProcessingLower, output);
            defaultColors.debug = debug;

            return defaultColors;

        } else if (config.mode.toLowerCase() === 'monocromatic') {
            let monocromaticColors = genPaletMonocromatic(colorHSL, postProcessingLower, output);
            monocromaticColors.debug = debug
            return monocromaticColors;

        } else if (config.mode.toLowerCase() === 'vibrant') {
            let vibrantColors = vibrantPalet(colorHSL, postProcessingLower, output);
            vibrantColors.debug = debug;
            return vibrantColors;
        }

    } else {
        //Lança um erro, caso a cor seja um hex invalido
        throw new Error(`hex ${config.color} invalido, exemplo de hex: #f1f1f1`);
    };
};
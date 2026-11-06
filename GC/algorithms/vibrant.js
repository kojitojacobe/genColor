'use strict';


import { luminance, darkness } from "./func/Luminance/Luminance.js";
import Matiz from "./func/Matiz/Matiz.js";
import hslToHEX from "../conversions/hslToHEX.js";
import hslToRGB from "../conversions/hslToRGB.js";
import setFixed2 from "../utils/setFixed2.js";
import mapPalet from "../utils/modPalet.js";
import postProcessingSecurityApply from "../utils/Security/PostProcessingSecurity/postProcessingSecurityApply.js";
import { saturation } from "./func/Saturation/Saturation.js";


/**
 * 
 * @param {array} hsl - array com cor hsl 
 * @param {array} postEffect - array com efeitos de pos-processamento 
 * @param {string} types - string com tipo de saida de cor, por padrão em hex
 * @example - vibrantPalet([50, 50, 50], ['hdr'], 'hex')
 * @returns - retorna um objeto, com novas paletas de cores geradas a partir de hsl 
 * @author - Kojito Jacobe
 */
export default function vibrantPalet(hsl, postEffect, types = 'hex') {
    //Configuração base(Vibrant)
    const genPaletVibrant = {

        0: [setFixed2(hsl[0], 0), setFixed2(hsl[1], 0), setFixed2(hsl[2], 0)],

        50: [setFixed2(Matiz(hsl[0], 2)), setFixed2(saturation(hsl[1], 0.70), 0), setFixed2(luminance(hsl[2], 0.3), 0)],


        100: [setFixed2(Matiz(hsl[0], 4), 0), setFixed2(saturation(hsl[1], 0.75), 0), setFixed2(luminance(hsl[2], 0.2), 0)],
        150: [setFixed2(Matiz(hsl[0], 6), 0), setFixed2(saturation(hsl[1], 0.80), 0), setFixed2(luminance(hsl[2], 0.1), 0)],
        200: [setFixed2(Matiz(hsl[0], 8), 0), setFixed2(saturation(hsl[1], 0.85), 0), setFixed2(darkness(hsl[2], 0), 0)],
        250: [setFixed2(Matiz(hsl[0], 10), 0), setFixed2(saturation(hsl[1], 0.90), 0), setFixed2(darkness(hsl[2], 0.1), 0)],
        300: [setFixed2(Matiz(hsl[0], 12), 0), setFixed2(saturation(hsl[1], 0.95), 0), setFixed2(darkness(hsl[2], 0.2), 0)],
        350: [setFixed2(Matiz(hsl[0], 14), 0), setFixed2(saturation(hsl[1], 0.95), 0), setFixed2(darkness(hsl[2], 0.3), 0)],
        400: [setFixed2(Matiz(hsl[0], 16), 0), setFixed2(saturation(hsl[1], 0.95), 0), setFixed2(darkness(hsl[2], 0.4), 0)]
    };

    //verifica se o usuario, pedio efeitos de pos-Processamento
    let postEffectValide = postEffect.length > 0;

    //Se for RGB, aplica efeitos de pos-Processamento(se disponiveis) comverte as cores para RGB e retorna, mesma logica para os demais
    if (types === 'rgb') {
        let genPaleVibranttRGB = mapPalet(genPaletVibrant, hslToRGB);
        if (postEffectValide) {
            let genPaletRGBSmooth = postProcessingSecurityApply(postEffect, genPaletVibrant);
            return mapPalet(genPaletRGBSmooth, hslToRGB)
        } else {
            return genPaleVibranttRGB
        }
    } else if (types === 'hsl') {
        if (postEffectValide) {
            let genPaletVibrantHSLSmooth = postProcessingSecurityApply(postEffect, genPaletVibrant);
            return genPaletVibrantHSLSmooth
        } else {
            return genPaletVibrant;
        }
    } else if (types === 'hex') {
        if (postEffectValide) {

            let genPaletVibrantHEXSmooth = postProcessingSecurityApply(postEffect, genPaletVibrant);

            return mapPalet(genPaletVibrantHEXSmooth, hslToHEX);
        } else {
            return mapPalet(genPaletVibrant, hslToHEX);
        };
    } else { // gera erro, em caso de saida de cor invalida
        throw new Error(`Erro, saida de cor invalida: ${types}`);
    }
};
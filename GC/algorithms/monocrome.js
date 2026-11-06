'use strict';

import { deSaturation } from "./func/Saturation/Saturation.js";
import { luminance, darkness } from "./func/Luminance/Luminance.js";
import Matiz from "./func/Matiz/Matiz.js";
import hslToHEX from "../conversions/hslToHEX.js";
import hslToRGB from "../conversions/hslToRGB.js";
import setFixed2 from "../utils/setFixed2.js";
import mapPalet from "../utils/modPalet.js";
import postProcessingSecurityApply from "../utils/Security/PostProcessingSecurity/postProcessingSecurityApply.js";



/**
 * 
 * @param {array} hsl - array com cor hsl 
 * @param {array} postEffect - array com efeitos de pos-processamento 
 * @param {string} types - string com tipo de saida de cor, por padrão em hex
 * @example - genPaletMonocromatic([50, 50, 50], ['hdr'], 'hex')
 * @returns - retorna um objeto, com novas paletas de cores geradas a partir de hsl 
 * @author - Kojito Jacobe
 */
export default function genPaletMonocromatic(hsl, postEffect, types = 'hex') {
    //configuração base(Monocromatico)
    const genPaletMonocromatic = {

        0: [setFixed2(hsl[0], 0), setFixed2(hsl[1], 0), setFixed2(hsl[2], 0)],
        50: [setFixed2(Matiz(hsl[0], 6), 0), setFixed2(deSaturation(hsl[1], 0.1), 0), setFixed2(luminance(hsl[2], 0.05), 0)],


        100: [setFixed2(Matiz(hsl[0], 5), 0), setFixed2(deSaturation(hsl[1], 0.2), 0), setFixed2(luminance(hsl[2], 0.15), 0)],
        150: [setFixed2(Matiz(hsl[0], 4), 0), setFixed2(deSaturation(hsl[1], 0.3), 0), setFixed2(luminance(hsl[2], 0.20), 0)],
        200: [setFixed2(Matiz(hsl[0], 3), 0), setFixed2(deSaturation(hsl[1], 0.4), 0), setFixed2(luminance(hsl[2], 0.25), 0)],
        250: [setFixed2(Matiz(hsl[0], 2), 0), setFixed2(deSaturation(hsl[1], 0.5), 0), setFixed2(luminance(hsl[2], 0.30), 0)],
        300: [setFixed2(Matiz(hsl[0], 1), 0), setFixed2(deSaturation(hsl[1], 0.6), 0), setFixed2(luminance(hsl[2], 0.35), 0)],
        350: [setFixed2(Matiz(hsl[0], -1), 0), setFixed2(deSaturation(hsl[1], 0.7), 0), setFixed2(luminance(hsl[2], 0.40), 0)],
        400: [setFixed2(Matiz(hsl[0], -2), 0), setFixed2(deSaturation(hsl[1], 0.8), 0), setFixed2(luminance(hsl[2], 0.45), 0)]
    };

    //verifica se o usuario, pedio efeitos de pos-Processamento
    let postEffectValide = postEffect.length > 0;

    //Se for RGB, aplica efeitos de pos-Processamento(se disponiveis) comverte as cores para RGB e retorna, mesma logica para os demais
    if (types === 'rgb') {
        let genPaletRGB = mapPalet(genPaletMonocromatic, hslToRGB);
        if (postEffectValide) {
            let genPaletRGBSmooth = postProcessingSecurityApply(postEffect, genPaletMonocromatic);
            return mapPalet(genPaletRGBSmooth, hslToRGB)
        } else {
            return genPaletRGB
        }
    } else if (types === 'hsl') {
        if (postEffectValide) {
            let genPaletHSLSmooth = postProcessingSecurityApply(postEffect, genPaletMonocromatic);
            return genPaletHSLSmooth
        } else {
            return genPaletMonocromatic;
        }
    } else if (types === 'hex') {
        if (postEffectValide) {
            let genPaletHEXSmooth = postProcessingSecurityApply(postEffect, genPaletMonocromatic);
            return mapPalet(genPaletHEXSmooth, hslToHEX);
        } else {
            return mapPalet(genPaletMonocromatic, hslToHEX);
        };
    } else { //gera erro em caso de saida de cor invalida
        throw new Error(`Erro, saida de cor invalida: ${types}`);
    };
};
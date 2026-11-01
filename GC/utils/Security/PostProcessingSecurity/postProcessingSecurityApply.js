'use strict';

import tonemap from '../../../algorithms/func/PostProcessing/ToneMap/toneMap.js';
import hdr from '../../../algorithms/func/PostProcessing/HDR/hDR.js';
import smooth from '../../../algorithms/func/PostProcessing/Smooth/smooth.js';
import EffectsEnable from './postEffectsEnable.json' with {type: 'json'};


/**
 * função para percorrer a paleta de cores, e aplicar efeitos de Pos-Processamento de forma dinamica, protegendo contra efeitos invalidos
 * @param {array} effects - array com efeitos de pos-processamento 
 * @param {object} genPalet - paleta de cores 
 * @example - exemplo: postProcessingSecurityApply(['hdr'], myPalet) -> paletaModificada
 * @returns {postProcessingArray} - retorna a paleta de cores, com os efeitos da lista(effects) ja aplicado
 */
export default function postProcessingSecurityApply(effects, genPalet) {

    /**
     * Função para alertar, sobre efeitos invalidos
     * @param {array} value - array com efeitos validos(EffectsEnable)
     * @returns {string} - retorna uma mensagem no console, alertando sobre valor invalido 
     */
    const warn = (value = effects) => {console.log('Erro: valor invalido detectado', value, 'paleta padrão retornada')};

    //verifica se é uma string, ou se é uma string vazia ''
    const isString = effects.every(item => typeof (item) === 'string' || item.length !== 0);

    if (isString) {
        /**
         * Função para verificar se o array de entrada e valido com os efeitos disponiveis(effectsEnable)
         * @returns {boolean} - retorna true, se os efeitos pedidos forem validos
         */
        function isValideProcessingArray() {
            const postEffectsEnableList = EffectsEnable.postEffectEnables;
            const valid = effects.every(item => postEffectsEnableList.includes(item));

            return valid;
        }

        //Objeto com cores processadas
        let postProcessingArray = {};

        const effectsApply = {
            'smooth': smooth,
            'tonemap': tonemap,
            'hdr': hdr
        };


        if (isValideProcessingArray()) {

            //Verificação da quantidade de efeitos do array, mude o valor, caso crie um novo efeito
            if (effects.length === 3) {
                //faz um loop 9 vezes
                for (let i = 0; i <= 400; i += 50) {
                    postProcessingArray[i] = effectsApply[effects[0]](effectsApply[effects[1]](effectsApply[effects[2]](genPalet[i])));
                }
                
                //Objeto final
                return postProcessingArray;



            } else if (effects.length === 2) {
                for (let i = 0; i <= 400; i += 50) {

                    postProcessingArray[i] = effectsApply[effects[0]](effectsApply[effects[1]](genPalet[i]));
                };
                
                return postProcessingArray;




            } else if (effects.length === 1) {
                for (let i = 0; i <= 400; i += 50) {
                    postProcessingArray[i] = effectsApply[effects[0]](genPalet[i])
                }
                return postProcessingArray;



            }
        } else {
            warn() //Alerta, em caso de efeito invalido
            return genPalet;
        }
    } else {
        warn()
        return genPalet;
    }

};

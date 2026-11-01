'use strict';
import setFixed2  from '../utils/setFixed2.js'

//Objeto com valores hex
const hexList = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, a: 10, b: 11, c:12, d:13, e:14, f:15};

/**
 * 
 * @param {string} hex - Uma string, com cor hex extendido 
 * @example - Exemplo, hexToHSL("#f1f1f1"); -> retorna [0, 0, 95]
 * @returns - retorna a cor hex extendido comvertido para hsl: [H, S, L]
 */
export default function hexToHSL(hex) {
  let noHash = hex.slice(1); //Remove o #
  let hexPar = [];
  //faz um loop, a cada loop, adiciona um par dos caracteres de hex
  for (let i = 0; i < noHash.length; i += 2) { 
    hexPar.push(noHash[i] + noHash[i + 1]);
  };
  // Comverte um array com 3 pares hex em rgb usando a formula (xx * 16¹) + (xx * 16°)
  let rgb = hexPar.map(item => { 
    return (
      hexList[item[0].toLowerCase()] * 16 + hexList[item[1].toLowerCase()] * 1
    );
  });

  //Normaliza os valores
  let normal = rgb.map((item) => {
    return (item / 255);
  });

  //Objeto com operações de comversão para hsl
  let hsl = {
    brightness: (Math.max(...normal) + Math.min(...normal)) / 2,
    get saturation() {
      let max = Math.max(...normal);
      let min = Math.min(...normal);
      if (max === min) {
        return 0;
      } else if (this.brightness <= 0.5) {
        return (max - min) / (max + min);
      } else {
        return ((max - min) / (2 - (max + min)));
      }
    },
    get matiz() {
      let max = Math.max(...normal);
      let min = Math.min(...normal);
      if (max === min) {
        return 0;
      } else if (max === normal[0]) {
        return (60 * ((normal[1] - normal[2]) / (max - min)) + 360) % 360;
      } else if (max === normal[1]) {
        return (60 * ((normal[2] - normal[0]) / (max - min) + 2) + 360) % 360;
      } else if (max === normal[2]) {
        return (60 * ((normal[0] - normal[1]) / (max - min) + 4) + 360) % 360;
      }
    },
  };

  return [setFixed2(hsl.matiz), setFixed2((hsl.saturation * 100)), setFixed2((hsl.brightness * 100), 5)];
};
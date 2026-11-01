"use strict";
/**
 * 
 * @param {Number} value - recebe um numero, para fixar o numero de casas decimais
 * @param {Number} decimalNumbers - a quantidade de casas decimais que devera ser fixa, por padrão em 4
 * @throws - Pode arredondar levemente o valor de entrada, pois usa .toFixed, depois comvertendo para Int
 * @returns - Retorna um valor inteiro com casas decimais fixas em valor x, por padrão em 4 casas decimais
 */
export default function setFixed2(value, decimalNumbers=4) {
  return Number(value.toFixed(decimalNumbers));
}
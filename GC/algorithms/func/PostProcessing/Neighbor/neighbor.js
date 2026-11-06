'use strict';

import { antiLeak, antiLeakHue } from "../../../../utils/Security/AntiLeake/antiLeakageColors.js";
import setFixed2 from "../../../../utils/setFixed2.js";

export default function neighbor(hsl, palet, key) {
    //Pesos, ajuste para efeitos mais visiveis
    const A = 0.02;
    const AH = 0.07;

    const STEEPS = 50;

    //Obtem a posição, anterior e depois do objeto de cores
    const BEFORE = palet[key - STEEPS] ?? palet[key];
    const CURRENT = palet[key];
    const AFTER = palet[key + STEEPS] ?? palet[key];

    //Novo S e L(hsl)
    let l = BEFORE[2] * A + CURRENT[2] * (1 - 2 * A) + AFTER[2] * A;
    let s = BEFORE[2] * A + CURRENT[2] * (1 - 2 * A) + AFTER[2] * A;

    //obtem o Hue, da cor anterior, cor de agora, cor de depois
    const HPREV = BEFORE[0];
    const HCURR = CURRENT[0];
    const HNEXT = AFTER[0];

    //Hue final
    const DPREV = ((HPREV - HCURR + 540) % 360) - 180;
    const DNEXT = ((HNEXT + HCURR + 540) % 360) - 180;

    let h = (HCURR + AH * (DPREV + DNEXT) + 360) % 360;


    //HSL final
    return [setFixed2(h, 0), setFixed2(antiLeak(s), 0), setFixed2(antiLeak(l), 0)];
};
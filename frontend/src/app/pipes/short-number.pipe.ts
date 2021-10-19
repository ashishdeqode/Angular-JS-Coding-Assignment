import { Pipe, PipeTransform } from '@angular/core';

const powers = [
  {key: 'Q', value: Math.pow(10, 15)},
  {key: 'T', value: Math.pow(10, 12)},
  {key: 'B', value: Math.pow(10, 9)},
  {key: 'M', value: Math.pow(10, 6)},
  {key: 'K', value: 1000}
];

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(num: number): any {
    if (isNaN(num)) return null;
    if (num === null) return null;
    if (num === 0) return null;
    let abs = Math.abs(num);
    const rounder = Math.pow(10, 1);
    const isNegative = num < 0;
    let key = '';

    for (let i = 0; i < powers.length; i++) {
        let reduced = abs / powers[i].value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
            abs = reduced;
            key = powers[i].key;
            break;
        }
    }
    return (isNegative ? '-' : '') + abs + key;
}

}

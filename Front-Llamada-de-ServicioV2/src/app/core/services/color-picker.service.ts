import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  
  private colorPalettes: { [key: string]: string[] } = {
    default: [
      'rgba(52, 95, 224, 0.99)',
      'rgba(51, 63, 97, 0.99)',
      'rgba(40, 73, 173, 0.99)',
      'rgba(22, 41, 97, 0.99)',
      'rgba(122, 149, 230, 0.99)'
    ],
    nice : [
      'rgba(36, 47, 155, 0.99)',
      'rgba(100, 111, 212, 0.99)',
      'rgba(155, 163, 235, 0.99)',
      'rgba(219, 223, 253, 0.99)',
      'rgba(220, 220, 220, 0.99)'
    ],
    nice2 : [
      'rgba(29, 26, 57, 0.99)',
      'rgba(69, 25, 82, 0.99)',
      'rgba(102, 37, 73, 0.99)',
      'rgba(174, 68, 90, 0.99)',
      'rgba(243, 159, 90, 0.99)',
      'rgba(232, 188, 185, 0.99)'
    ],
    nice3 : [
      'rgba(6, 20, 46, 0.99)',
      'rgba(27, 51, 88, 0.99)',
      'rgba(71, 62, 102, 0.99)',
      'rgba(189, 131, 184, 0.99)',
      'rgba(245, 215, 219, 0.99)',
      'rgba(241, 145, 109, 0.99)'
    ],
    orangedrip: [
      'rgba(5, 24, 33, 0.99)',
      'rgba(26, 70, 69, 0.99)',
      'rgba(38, 104, 103, 0.99)',
      'rgba(245, 136, 0, 0.99)',
      'rgba(248, 188, 36, 0.99)'
    ],
    ripped: [
      'rgba(54, 14, 149, 0.99)',
      'rgba(113, 205, 192, 0.99)',
      'rgba(244, 216, 61, 0.99)',
      'rgba(242, 191, 200, 0.99)',
      'rgba(232, 116, 99, 0.99)'
    ],
    thirsty: [
      'rgba(16, 5, 62, 0.99)',
      'rgba(112, 134, 235, 0.99)',
      'rgba(245, 227, 109, 0.99)',
      'rgba(240, 177, 186, 0.99)',
      'rgba(101, 179, 123, 0.99)'
    ],
    dustedglass: [
      'rgba(193, 210, 216, 0.99)',
      'rgba(177, 157, 153, 0.99)',
      'rgba(220, 198, 174, 0.99)',
      'rgba(238, 221, 206, 0.99)',
      'rgba(240, 237, 234, 0.99)'
    ],
    kidsroom: [
      'rgba(28, 71, 85, 0.99)',
      'rgba(245, 195, 0, 0.99)',
      'rgba(239, 196, 88, 0.99)',
      'rgba(255, 159, 82, 0.99)',
      'rgba(246, 103, 71, 0.99)'
    ],
    vintage: [
      'rgba(255, 175, 135, 0.99)',
      'rgba(0, 160, 143, 0.99)',
      'rgba(204, 102, 134, 0.99)',
      'rgba(115, 89, 131, 0.99)',
      'rgba(37, 93, 131, 0.99)'
    ]
  };

  private colorIndexes: { [key: string]: number } = {};

  public getNextColor(paletteName: string = 'default'): string {
    const colorPalette = this.colorPalettes[paletteName];
    if (!colorPalette) {
      paletteName = 'default';
    }
    const colorIndex = this.colorIndexes[paletteName] || 0;
    const color = colorPalette[colorIndex % colorPalette.length];
    this.colorIndexes[paletteName] = colorIndex + 1;
    return color;
  }
  
}
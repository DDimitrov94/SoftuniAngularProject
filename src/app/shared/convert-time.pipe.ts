import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {

  transform(minutes: number): string {
    if (isNaN(minutes) || minutes < 0) {
      return 'Invalid Input';
    }
 
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours>0) {
      return hours + ' hours ' + remainingMinutes + ' minutes';
    }
    return remainingMinutes + ' minutes';
  }
}

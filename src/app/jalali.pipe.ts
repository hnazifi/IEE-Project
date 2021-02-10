import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';


@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    moment.locale('fa', { useGregorianParser: true });
    return moment.from(value, 'en').add(210,'minutes').format('YYYY/MM/DD HH:mm');
  }

}

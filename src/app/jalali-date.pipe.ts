import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    moment.locale('fa', { useGregorianParser: true });
    return moment.from(value, 'en').format('YYYY/MM/DD');
  }

}

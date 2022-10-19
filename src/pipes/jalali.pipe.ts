import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';


@Pipe({
  name: 'jalaliPipe'
})
export class JalaliPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY/MM/DD');
    return MomentDate.locale('fa').format('YYYY/M/D');
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, maxLength: number = 50): string {
    if (value == null) {
      return 'No Data Found';
    }

    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}

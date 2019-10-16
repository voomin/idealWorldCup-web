import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateAgo",
  pure: true
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return "지금";
      const intervals = {
        년: 31536000,
        달: 2592000,
        주: 604800,
        일: 86400,
        시간: 3600,
        분: 60,
        초: 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          // if (counter === 1) {
          return counter + " " + i + " 전"; // singular (1 day ago)
        // } else {
        //     return counter + ' ' + i + 's ago'; // plural (2 days ago)
        // }
      }
    }
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportsSearch'
})

export class ReportsSearchPipe implements PipeTransform {

  transform(reports: any, args?: any): any {
    const searchableList = ['armyNumber', 'name', 'catogiryName'];
    if (!reports) {
      return [];
    }
    if (!args) {
      return reports;
    }

    if (args) {
      args = args.toLowerCase();
      return reports.filter(function (report: any) {
          let isTrue = false;
          for (let i = 0; i < searchableList.length; i++ ) {
              if (report[searchableList[i]] != null) {
                  if (report[searchableList[i]].toLowerCase().indexOf(args) > -1) {
                      isTrue = true;
                  }
                  if (isTrue) {
                      return report;
                  }
              }
          }
      });
    }
  }

}

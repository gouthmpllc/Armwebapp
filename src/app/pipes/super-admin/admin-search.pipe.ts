import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminSearch'
})
export class AdminSearchPipe implements PipeTransform {

  transform(admins: any, args?: any): any {
    const searchableList = ['username', 'name', 'rank'];
    if (!admins) {
      return [];
    }
    if (!args) {
      return admins;
    }

    if (args) {
      args = args.toLowerCase();
      return admins.filter(function (admin: any) {
          let isTrue = false;
          for (let i = 0; i < searchableList.length; i++ ) {
              // return student.StudentInfo.student[searchableList[i]].toLowerCase().includes(searchText);
              // const adminInput = admin.studentDetails === undefined ? 'studentInfo' : 'studentDetails';
              if (admin[searchableList[i]] != null) {
                  if (admin[searchableList[i]].toLowerCase().indexOf(args) > -1) {
                      isTrue = true;
                  }
                  if (isTrue) {
                      return admin;
                  }
              }
          }
      });
    }
    // return null;
  }

}

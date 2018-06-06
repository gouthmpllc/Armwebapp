import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'candidateSearch'
})
export class CandidateSearchPipe implements PipeTransform {

  transform(candidates: any, args?: any): any {
    const searchableList = ['candArmyNum', 'candName', 'rank'];
    if (!candidates) {
      return [];
    }
    if (!args) {
      return candidates;
    }

    if (args) {
      args = args.toLowerCase();
      return candidates.filter(function (candidate: any) {
          let isTrue = false;
          for (let i = 0; i < searchableList.length; i++ ) {
              // return student.StudentInfo.student[searchableList[i]].toLowerCase().includes(searchText);
              // const candidateInput = candidate.studentDetails === undefined ? 'studentInfo' : 'studentDetails';
              if (candidate[searchableList[i]] != null) {
                  if (candidate[searchableList[i]].toLowerCase().indexOf(args) > -1) {
                      isTrue = true;
                  }
                  if (isTrue) {
                      return candidate;
                  }
              }
          }
      });
    }
    // return null;
  }

}

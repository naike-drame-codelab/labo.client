import { AbstractControl } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";

// export class CustomValidators {
//     static exists(cb: (control: any) => Observable<void>){
//         return (control: AbstractControl) => {
//             cb(control.value).pipe(
//                 map(() => ({ exist: true })),
//                 catchError(() => of(null))
//             )
//         }
//     }
// }
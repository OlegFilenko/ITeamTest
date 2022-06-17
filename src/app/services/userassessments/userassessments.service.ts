import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserassessmentsGrafResponseModel } from './models/userassessments-graf-response.model';
import { UserassessmentsResponseModel } from './models/userassessments-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserassessmentsService {

  constructor(private readonly http: HttpClient) { }

  getAssessmentReports(): Observable<UserassessmentsResponseModel[]> {
    return of([
      { id: 1, name: "Core Drivers", users_resolved: 5, active: true, image_url: "https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg" }
    ]);
  }

  getGraph(id: number): Observable<UserassessmentsGrafResponseModel> {
    return of({ data: { Agreeableness: 13.333333333333334, Drive: 21.666666666666668, Luck: 10, Openess: 30 }, type: "bar" });
  }

}

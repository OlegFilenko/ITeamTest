import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageService } from '../../../services/error-message/error-message.service';
import { UserassessmentsGrafResponseModel } from '../../../services/userassessments/models/userassessments-graf-response.model';
import { UserassessmentsService } from '../../../services/userassessments/userassessments.service';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  id: number;
  dataSource: UserassessmentsGrafResponseModel;
  dataSourceString: string;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly userassessmentsService: UserassessmentsService,
    private readonly errorMessage: ErrorMessageService
  ) {
    activateRoute.params.subscribe(
      params => {
        this.id = activateRoute.snapshot.params['id'];
      }
    );
  }

  ngOnInit(): void {
    this.userassessmentsService.getGraph(this.id).subscribe(
      data => {
        this.dataSource = data;
        this.dataSourceString = JSON.stringify(this.dataSource);
      },
      error => this.errorMessage.show(error)
    );
  }

}

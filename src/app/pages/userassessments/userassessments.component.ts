import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageService } from '../../services/error-message/error-message.service';
import { UserassessmentsResponseModel } from '../../services/userassessments/models/userassessments-response.model';
import { UserassessmentsService } from '../../services/userassessments/userassessments.service';

@Component({
  selector: 'userassessments',
  templateUrl: './userassessments.component.html',
  styleUrls: ['./userassessments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserassessmentsComponent implements OnInit {

  dataSource: UserassessmentsResponseModel[] = [];

  dataKeys: string[] = ["id", "name", "users_resolved", "active"];

  constructor(
    private readonly userassessmentsService: UserassessmentsService,
    private readonly errorMessage: ErrorMessageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData(): void {
    this.userassessmentsService.getAssessmentReports().subscribe(
      data => this.dataSource = data,
      error => this.errorMessage.show(error)
    );
  }

  onReportClick(value: number): void {
    this.router.navigate([`/userassessments/graph/${value}`])
  }
}

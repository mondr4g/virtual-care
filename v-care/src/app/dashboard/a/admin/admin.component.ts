import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  helper = new JwtHelperService();

  // GRAFICA DE BARRAS -----------------------------------------------------------------------------------------------------
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Pediatria', 'Ginecologia', 'Medico Cirujano', 'Oftamologia'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [2, 2, 1, 5], label: 'Doctores' },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // GRAFICA DE PASTEL ---------------------------------------------------------------------------------------
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Mujeres', 'Otros', 'Hombres'];
  public pieChartData: number[] = [4, 3, 5];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  // GRAFICA POLAR ----------------------------------------------------------------------------------------------------
  // PolarArea
  public polarAreaChartLabels: Label[] = ['Unidad-M1', 'Unidad-M2', 'Unidad-M3', 'Unidad-M4', 'Unidad-M5'];
  public polarAreaChartData: SingleDataSet = [4, 2, 1, 1, 1];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  // GRAFICA DE PASTEL2 ---------------------------------------------------------------------------------------
    public pieChartOptions2: ChartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value: any, ctx: any) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    public pieChartLabels2: Label[] = ['0-15', '15=20', '20-30', '30-50', '50-70', '70-*'];
    public pieChartData2: number[] = [5, 2, 1, 3, 1, 1];
    public pieChartType2: ChartType = 'pie';
    public pieChartLegend2 = true;
    public pieChartPlugins2 = [];
    public pieChartColors2 = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(144,12,63,0.3)', 'rgba(255,195,0,0.3)', 'rgba(88,24,69,0.3)'],
      },
    ];


      // GRAFICA DE BARRAS -----------------------------------------------------------------------------------------------------
  public barChartOptions2: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels2: Label[] = ['Pediatria', 'Ginecologia', 'Medico Cirujano', 'Oftamologia'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  public barChartData2: ChartDataSets[] = [
    { data: [2, 3, 1, 5], label: 'Doctores' },
  ];

  public colors2 = [
    {
      backgroundColor: ['rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.checkLink();
  }

  checkLink() {
    let token = localStorage.getItem('auth-token'); 
    if(!token) {
      this.router.navigateByUrl('');
    }
    else {
      let decToken = this.helper.decodeToken(token);
      switch(decToken.type){
        case 0:
          break; //admin
        case 1:
          this.router.navigateByUrl('/dashboard/doc');
          break; //doc
        case 2:
          this.router.navigateByUrl('/dashboard/nurse');
          break; //nurse
        case 3:
          this.router.navigateByUrl('/dashboard/registConsulta');
          break; //url del componente de registro de pacientes
        default:
          this.router.navigateByUrl('');
          break;
      }
    }
  }

}

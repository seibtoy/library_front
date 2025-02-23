import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-financials',
  imports: [],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss',
})
export class FinancialsComponent implements OnInit {
  transactions: any[] = [];
  lineChart: any;
  pieChart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    this.http
      .get('http://localhost:5000/transactions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (transactions: any) => {
          this.transactions = transactions;
          this.createChart('line', 'lineChart');
          this.createChart('pie', 'pieChart');
        },
        error: (err) => {
          console.error('Error fetching transactions', err);
        },
      });
  }

  createChart(chartType: 'line' | 'pie', canvasId: string): void {
    const groupedData: { [date: string]: number } = {};

    this.transactions.forEach((transaction) => {
      const date = new Date(transaction.returnDate).toLocaleDateString();
      if (groupedData[date]) {
        groupedData[date] += transaction.profit;
      } else {
        groupedData[date] = transaction.profit;
      }
    });

    const labels = Object.keys(groupedData).sort();
    const data = labels.map((date) => groupedData[date]);

    const chart = new Chart(canvasId, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Profit',
            data: data,
            backgroundColor:
              chartType === 'pie'
                ? [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                  ]
                : undefined,
            borderColor: chartType === 'line' ? 'rgb(75, 192, 192)' : undefined,
            tension: chartType === 'line' ? 0.1 : undefined,
          },
        ],
      },
      options: {
        scales:
          chartType === 'line'
            ? {
                y: {
                  beginAtZero: true,
                },
              }
            : undefined,
      },
    });

    if (chartType === 'line') {
      this.lineChart = chart;
    } else {
      this.pieChart = chart;
    }
  }
}

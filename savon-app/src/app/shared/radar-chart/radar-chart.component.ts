import { Component, AfterViewInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Très important : ce bloc doit être exécuté avant toute création de chart :
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent implements AfterViewInit {
  @Input() title: string = 'Diagramme Radar';
  @Input() scores: number[] = [];
  
  @ViewChild('radarCanvas') radarCanvas!: ElementRef;
  
  readonly labels = [
    'Douceur',
    'Lavant',
    'Volume mousse',
    'Tenue mousse',
    'Dureté',
    'Solubilité',
    'Séchage'
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngAfterViewInit(): void {
    // Vérifier si l'exécution est dans un navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Envelopper dans un setTimeout pour permettre au DOM de se stabiliser
      setTimeout(() => {
        if (this.radarCanvas && this.radarCanvas.nativeElement) {
          new Chart(this.radarCanvas.nativeElement, {
            type: 'radar',
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: this.title,
                  data: this.scores,
                  fill: true,
                  backgroundColor: 'rgba(210, 0, 255, 0.2)',
                  borderColor: 'rgb(210, 0, 255)',
                  pointBackgroundColor: 'rgb(0, 180, 0)',
                  pointBorderColor: 'rgb(0, 180, 0)',
                  pointHoverBackgroundColor: 'rgb(255, 255, 255)',
                  pointHoverBorderColor: 'rgb(0, 180, 0)'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false }, // Masque la légende pour gagner de l'espace
                tooltip: { enabled: true }
              },
              scales: {
                r: {
                  suggestedMin: 0,
                  suggestedMax: 10,
                  ticks: { 
                    stepSize: 2,     // Moins de lignes sur le graphique
                    display: false   // Masque les chiffres pour gagner de l'espace
                  },
                  angleLines: {
                    display: true
                  },
                  pointLabels: {
                    font: {
                      size: 8  // Taille de police plus petite pour les étiquettes
                    }
                  }
                }
              }
            }
          });
        }
      }, 0);
    }
  }
}
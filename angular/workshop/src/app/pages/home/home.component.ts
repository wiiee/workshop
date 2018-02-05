import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartOption: any;
  constructor() {
    this.chartOption = {
      "title": {
        "text": "组织结构图"
      },
      "tooltip": {
        "show": false,
        "trigger": "item"
      },
      "calculable": false,
      "series": [
        {
          "name": "树图",
          "type": "tree",
          "orient": "vertical",
          "data": [
            {
              "name": "深圳研发中心",
              "value": 6,
              "children": [
                {
                  "name": "机票研发部",
                  "value": 6,
                  "children": [
                    {
                      "name": "机票研发1",
                      "value": 4
                    },
                    {
                      "name": "机票研发2",
                      "value": 4
                    }
                  ]
                },
                {
                  "name": "酒店研发部",
                  "value": 6,
                  "children": [
                    {
                      "name": "酒店研发1",
                      "value": 4,
                    },
                    {
                      "name": "酒店研发2",
                      "value": 4
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }

  ngOnInit() {
  }

}

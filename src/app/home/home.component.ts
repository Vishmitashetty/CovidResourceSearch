import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.setGridColumns();
  }

  public title: string = 'Covid Resource Search';
  public searchText: string = null;
  public columnDefs: ColDef[] = <ColDef[]>[];
  public rowData: any[] = <any[]>[];
  public isGridShow: boolean = false;
  private gridApi: GridApi = null;
  private gridColumnApi: ColumnApi = null;
  private endPoint: string = environment.endpoint_url;


  public searchByQuery(): void {
    setTimeout(() => {
      this.searchTermByQuery(this.searchText)
    }, 1000);
  }

  public clearSearch(): void {
    this.searchText = "";
    this.rowData = [];
  }

  public searchTermByQuery(searchQuery: string): void {
    //Credentials
    var username = "elastic"
    var pwd = "DR1I0kM7oVVh9v6IHgNhJ2Bx"
    var authValue = username + ":" + pwd

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Basic " + btoa(authValue)
      })
    };

    const body = {
      size: 40,
      from: 0,
      query: {
        multi_match: {
          query: searchQuery,
          fields: ["state", "address", "tags", "distributor_name"],
          fuzziness: "auto"
        }
      }
    };

    this.http.post<SearchResult>(this.endPoint + '/covidresource/_search', body, httpOptions).subscribe(data => {
      this.rowData = data.hits.hits.map(s => s._source)
      if (data.hits.hits.length > 0 || searchQuery.length != 0) {
        this.isGridShow = true
      } else {
        this.isGridShow = false
      }
    });
  }

  downloadAsCSV() {
    this.gridApi.exportDataAsCsv();
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private setGridColumns(): void {
    this.columnDefs = [
      {
        headerName: 'Tags',
        field: 'tags',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Distributor Name',
        field: 'distributor_name',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Location',
        field: 'address',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Contact No',
        field: 'contact_no',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'Link',
        field: 'link',
        sortable: true,
        resizable: true,
        cellRenderer: this.linkRenderer
      },
      {
        headerName: 'Email Id',
        field: 'email_id',
        sortable: true,
        resizable: true
      },
      {
        headerName: 'State',
        field: 'state',
        sortable: true,
        resizable: true
      }
    ];
  }

  public linkRenderer(params: ICellRendererParams): string {
    if (params.value != null) {
      return '<a href=' + params.value + ' target="_blank">' + params.value + '</a>';
    }
    return '';
  }

}

//Model defination
interface SearchResult {
  hits: Hits
}
interface Hits {
  total: Total
  max_core: number
  hits: [SearchList]
}

interface Total {
  value: number
  relation: string
}

interface SearchList {
  _id: string
  _score: number
  _source: Source
}

interface Source {
  state: string
  distributor_name: string
  address: string
  email_id: string
  contact_no: string
  link: string
  tags: string
}
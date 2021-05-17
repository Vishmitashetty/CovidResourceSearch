import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Covid Resource Search';

  searchText: string = "";
  ColumnDefs: any;  
  RowData: any;    
  isGridShow: boolean = false
  
  viewHeight = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {  
    this.GetAgColumns();  
  } 

  ngAfterViewInit() {
    this.viewHeight = (window.outerHeight - 120);
  }

  searchByQuery() {
    setTimeout(()=>{ 
      console.log("hit")
      this.searchTermByQuery(this.searchText)
     }, 1000)

  }

  searchTermByQuery(searchQuery: string) {
    const headers = {'Content-Type': 'application/json' };
    const body = {
      size: 40, 
      from: 0,
      query: {
      multi_match: {
        query: searchQuery,
        fields: ["state","address", "tags", "distributor_name"],
        fuzziness: "auto"
      }
    }
  };
    this.http.post<SearchResult>('http://localhost:9200/covidresource/_search', body, { headers }).subscribe(data => {
       this.RowData = data.hits.hits.map(s => s._source)
       if(data.hits.hits.length > 0 || searchQuery.length != 0) {
          this.isGridShow = true
       } else {
         this.isGridShow = false
       }
       
    })
  }

  //Grid configuration
  GetAgColumns() {  
    this.ColumnDefs = [  
      { headerName: 'State', field: 'state', sortable: true, filter: true, resizable: true },  
      { headerName: 'Distributor Name', field: 'distributor_name', sortable: true, filter: true, resizable: true },  
      { headerName: 'Address', field: 'address', sortable: true, filter: true, resizable: true },  
      { headerName: 'Email Id', field: 'email_id', sortable: true, filter: true, resizable: true },  
      { headerName: 'Contact No', field: 'contact_no', sortable: true, filter: true, resizable: true },  
      { headerName: 'Tags', field: 'tags', sortable: true, filter: true, resizable: true }  
    ];  
  } 
}

//Model defination
interface SearchResult
{
  hits: Hits
}
interface Hits
{
  total: Total
  max_core: number
  hits: [SearchList]
}

interface Total
{
  value: number
  relation: string
}

interface SearchList
{
  _id: string
  _score: number
  _source: Source
}

interface Source
{
  state: string
  distributor_name: string
  address: string
  email_id: string
  contact_no: string
  tags: string
}
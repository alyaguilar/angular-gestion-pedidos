import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  users: Array<any>;
  user: {name: "", lastName: "", email: ""};
  action: string = "default";

  onCreate(){
    this.user = {name: "", lastName: "", email: ""};
    this.action = "create";
  }

  onEdit(user){
    this.user = user;
    this.action = "edit";
  }
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    console.log("Hola Clientes");
    this.onFind();

  }

  onFind(){
    this.clientService.find().subscribe((res:any) => {
      this.users = res.body;
      console.log(res.body);
   });
  }

  onSave(user){
    if (this.action == "edit"){
      this.clientService.updateOne(user).subscribe((res:any) => {
        this.onFind();
      });
    }
    if (this.action == "create"){
      this.clientService.insertOne(user).subscribe((res:any) => {
        this.onFind();
      });
    }
  }

  onDelete(id){
    this.clientService.deleteOne(id).subscribe((res:any) => {
      this.onFind();
    });
  }


}

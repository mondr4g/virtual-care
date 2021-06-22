import { Component, OnInit } from '@angular/core';
import { IMedUniShow } from '../services/register/models/IMedUnitShow';
import { UserAddress } from '../services/register/models/userAddress';
import { UserNormal } from '../services/register/models/userNormal';
import { UserNurse } from '../services/register/models/userNurse';
import { UserPersonal } from '../services/register/models/userPersonal';
import { RegistService } from '../services/register/regist.service';
import { ActivatedRoute } from '@angular/router';
import { AdminMostService } from '../services/adminserve/admin-most.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse-form',
  templateUrl: './nurse-form.component.html',
  styleUrls: ['./nurse-form.component.css']
})
export class NurseFormComponent implements OnInit {

  public address: UserAddress={
    calle:"",
    numero:"",
    interior:"",
    colonia:"",
    cp:"" ,
    ciudad:"",
    estado:"",
    pais:""    
  }; 
  public personal: UserPersonal={
    idUsuario:0,
    email:"",
    username:"",
    password:"",
    profileimg:"",
    email_check:false,
    email_verify_token:"" 
  } 
  public normal: UserNormal={
    nombre:"",
    apellido:"",
    genero:"",
    direccionId:0,
    fecha_nac: new Date(),
    telefono:"",
    celular:""
  }
  public nurse: UserNurse={
    idpersonal:0,
    idUnidadmedica:0
  }

  public selectUnid: IMedUniShow={
    IdUnidad:0,
    nombre:"",
    idDireccion:0
  };

  public unidades!: IMedUniShow[];
  public id: string='';

  constructor(private registService: RegistService, private route: ActivatedRoute,
    private admin: AdminMostService, private router:Router) { 
    this.registService.getUnits().subscribe(data=>{
      console.log(data.body);
      this.unidades = data.body;
      console.log(this.unidades);
      this.selectUnid = this.unidades[0];
    });
    this.route.paramMap.subscribe(params => {
      this.id = (params.get("idN")||'');
    });
    if(this.id){
      this.writeValues();
    }
  }

  ngOnInit(): void {
    //dashboard/admin/view-nurse/add-nurse
  }

  writeValues(){
    this.admin.getAllofEnf(this.id).subscribe(
      res=>{
        console.log(res);
        this.personal = res.body.pers;
        this.normal = res.body.user;
        this.nurse = res.body.enfe;
        this.selectUnid = res.body.unid;
        this.address = res.body.dire;
        this.personal.password="";
        this.address.interior = res.body.dire.interior;
        //this.normal.fecha_nac = res.body.user.fecha_nac;
        /*this.personal={
          idUsuario: Number(this.id),
          email:res.body[0],
          username:res.body[0].username,
          password:"",
          profileimg:res.body[0].profileimg,
          email_check:res.body[0].email_check,
          email_verify_token:res.body[0].email_verify_token 
        };
        this.normal={
          nombre:res.body[0].nombre,
          apellido:res.body[0].apellido,
          genero:res.body[0].genero,
          direccionId:res.body[0].Id,
          fecha_nac: res.body[0].fecha_nac,
          telefono:res.body[0].telefono,
          celular:res.body[0].celular
        };
        this.nurse={
          idpersonal:res.body[0].idpersonal,
          idUnidadmedica:res.body[0].idUnidadmedica
        };
        this.selectUnid={
          IdUnidad:res.body[0].IdUnidad,
          nombre:res.body[0].numero,
          idDireccion:res.body[0].idDireccion
        };
        this.address={
          calle:res.body[0].calle,
          numero:res.body[0].numero,
          interior:res.body[0].interior,
          colonia:res.body[0].colonia,
          cp:res.body[0].cp ,
          ciudad:res.body[0].ciudad,
          estado:res.body[0].estado,
          pais:res.body[0].pais    
        };*/
      },
      err=>{
        console.log(err);
      }
    );
  }

  public registrar(){
    console.log(this.address);
    console.log(this.normal);
    console.log(this.personal);
    console.log(this.nurse);
    console.log(this.selectUnid);

    var a = this.guessUnit(this.selectUnid.nombre);
    console.log(a);
    if(a.b){
      this.selectUnid.IdUnidad = a.id || 0;
      this.nurse.idUnidadmedica = a.id || 0;
    }else{
      this.nurse.idUnidadmedica = 0; 
    }
    if(this.id==''){
      this.registService.newNurse(this.address,this.personal,this.normal,this.nurse).subscribe(a=>{
        alert(a.message);
      });
    }else{
      var aux = {dire: this.address,pers: this.personal, user: this.normal, nurs: this.nurse};
      this.admin.updateEnf(aux).subscribe(res=>{alert(res.body)},err=>{console.log(err)});
    }
    this.router.navigateByUrl('dashboard/admin/view-nurse');
    console.log(this.nurse.idUnidadmedica);
  }

  private guessUnit(nombre:string):sE{
    var s = new sE(0,true);
    var ll = this.unidades?.find(e=>e.nombre==nombre);
    console.log(ll);
    if(ll!=undefined){
      s.id = ll.IdUnidad;
      s.b = true;
      return s;
    }else{
      s.id=0;
      s.b=false;
      return s;
    }
  }

}
class sE{
  public id?:number;
  public b?:boolean;

  constructor(id:number, b:boolean){
    this.id = id;
    this.b = b;
  }
}

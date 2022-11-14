import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../interfaces/cliente-interface';
import { dtoNuevaVenta } from '../../interfaces/dtoVenta';
import { productos } from '../../interfaces/productos';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { identifierName } from '@angular/compiler';
import { NuevaVentaService } from '../../services/nueva-venta.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  @ViewChild('factura',{static:false}) el!: ElementRef
  // Factura: dtoNuevaVenta= {id:1,total: 2700, fecha: '31/10/2022', 
  //   producto : [{ nombre: 'Helado de 1 kilo', precio:1000, cantidad:2, articulos :[{nombre:'Limón'},{nombre:'Chocolate'},{nombre:'Crema Americana'}]},
  //               { nombre: 'Helado de 1/2 kilo', precio:700, cantidad:1, articulos :[{nombre:'Frutilla'},{nombre:'Tramontana'},{nombre:'Banana con DDL'}]}], 
  //   Cliente: {businessName: 'Juan Perez', identifierTypeId: 1, identifier:'20654135', homeAdress: 'San Lorenzo 840', email: 'jperez@gmail.com'}};
  Factura: dtoNuevaVenta = {} as dtoNuevaVenta;
    TiposIdentifiers: string[]=['','DNI','CUIT','CUIL'];

  constructor(private ventaService: NuevaVentaService) {}
  
  ngOnInit(): void {
    this.ventaService.selectedVenta$.subscribe((value) => {
      this.Factura = value;
    });
  }

  
  generatePDF(){
    let pdf = new jsPDF()
    var margin =10;
    var scale = (pdf.internal.pageSize.width *1.3)/ document.body.scrollWidth;
    pdf.html(this.el.nativeElement,{
      y:margin,
      x:margin,
      html2canvas: {scale:scale},
      callback:(pdf) => {
        pdf.save("comprobante-" + this.Factura.id!.toString() +  ".pdf");
        pdf.output('dataurlnewwindow', {filename:'comprobante.pdf'});
      }
    });
  }
  openPDF(){
    let pdf = new jsPDF()
    var margin =10;
    var scale = (pdf.internal.pageSize.width *1.3)/ document.body.scrollWidth;
    pdf.html(this.el.nativeElement,{
      y:margin,
      x:margin,
      html2canvas: {scale:scale},
      callback:(pdf) => {
        pdf.output('dataurlnewwindow', {filename:"factura-" + this.Factura.id!.toString() +  ".pdf"});
      }
    });
  }

  //downloadPDF() {
    // Extraemos el
    //const doc = new jsPDF('p', 'pt', 'a4');
    //var margin =10;
    //var scale = (doc.internal.pageSize.width - margin * 2)/ document.body.scrollWidth;
    //doc.html(document.body,{
    //  x:margin,
    //  y:margin,
    //  html2canvas: {scale:scale},
    //  callback: function(doc){doc.output('dataurlnewwindow', {filename:'factura.pdf'})}
    //});
    //html2canvas(DATA, options).then((canvas) => {

    //  const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
     // const bufferX = 15;
     // const bufferY = 15;
     // const imgProps = (doc as any).getImageProperties(img);
     // const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
     //const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
     //return doc;
   // }).then((docResult) => {
    //  docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    //});
  //}
}

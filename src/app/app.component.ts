import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { XmlDataService } from './Xml-Data.service'

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
title = 'app';
data: any;
product_img;
items:any;
exportbtn:boolean;
xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;
exportdata=[];
count=0;
constructor(private ngxXml2jsonService: NgxXml2jsonService, private XmlData: XmlDataService) {

}
ngOnInit() {
this.exportbtn=true;
this.ImportRecords();
}

ImportRecords() {
this.XmlData.getXML().subscribe(data => {
this.data = data;
//console.log(data);
const parser = new DOMParser();
const xml = parser.parseFromString(this.data, 'text/xml');
const obj = this.ngxXml2jsonService.xmlToJson(xml);
//console.log(encodeURIComponent(xml));
//console.log(obj);
this.product_img = obj['catalog']['product'];      
//console.log(this.product_img);
// console.log(obj['catalog']['product'][0]);
//console.log(obj['catalog']['product'][0]);
});

}
refreshImages(status) {
if (status == true) {
console.log("Uploaded successfully!");
this.ImportRecords();

}
}
enablecode(event){
if(event.target.checked){
this.count++; 
}
else
{
this.count--;
}
if(this.count>0){
this.exportbtn=false;
}
else{
this.exportbtn=true;
}

}
ExportRecords(){
this.items=document.getElementsByName('acs');
var selectedItems=[];
for(var i=0; i<this.items.length; i++){
if(this.items[i].checked==true){
selectedItems.push(this.items[i].value);
}
}        
for(var n=0;n<this.product_img.length;n++){
for(var m=0;m<selectedItems.length;m++){
if(this.product_img[n].sku==selectedItems[m]){
this.exportdata.push(this.product_img[n]);
}
}
}
for(var z=0;z<this.exportdata.length;z++){
delete this.exportdata[z]['#text'];    
}
var inputJSON = '{"catalog":{"product":';
var k='}}';
var finalxml=inputJSON+JSON.stringify(this.exportdata)+k;
//console.log(JSON.parse(finalxml));
this.doco(finalxml);
}
doco(parsedInput){
var output = this.OBJtoXML(JSON.parse(parsedInput));
//console.log(output)

var pom = document.createElement('a');
pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
pom.setAttribute('download', 'selected.xml');

if (document.createEvent) {
var event = document.createEvent('MouseEvents');
event.initEvent('click', true, true);
pom.dispatchEvent(event);
}
else {
pom.click();
}



}
OBJtoXML(obj) {
var xml = '';
for (var prop in obj) {
if (obj[prop] instanceof Array) {
for (var array in obj[prop]) {
xml += '\n';
xml += '<' + prop + '>';
xml += '\n';
xml += this.OBJtoXML(new Object(obj[prop][array]));
xml += '</' + prop + '>';
xml += '\n';
}
} else {
xml += '<' + prop + '>';
typeof obj[prop] == 'object' ? xml += this.OBJtoXML(new Object(obj[prop])) : xml += obj[prop];
xml += '</' + prop + '>\n';
}
}
var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
return xml;
}
}
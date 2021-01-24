import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {

  private article: Articulo[] = [
    {
      nombre: "Educación Financiera",
      resumen: "Existe varias definiciones de educación financiera: La OCDE lo define como un proceso mediante el cual los individuos adquieren una mejor comprensión de los conceptos",
      bio: "Existe varias definiciones de educación financiera: <br> <br> La OCDE lo define como un proceso mediante el cual los individuos adquieren una mejor comprensión de los conceptos y productos financieros y desarrollan las habilidades necesarias para tomar decisiones informadas, evaluar riesgos y oportunidades financieras, y mejorar su bienestar.<br> <br> Por otro lado la Comisión de Educación Financiera de Estados Unidos Financial Literacy and Education Commision lo define como  proveer la información y los conocimientos, así como ayudar a desarrollar las habilidades necesarias para evaluar las opciones y tomar las mejores decisiones financieras<br><br> La unión europea no solo define a la educación financiera como el proceso por el cual los consumidores e inversores aumentan la comprensión de productos financieros por medio de la información, aprendizaje y objetivos, desarrollando habilidades y la confianza de ser conscientes de los riesgos y oportunidades financieros por lo tanto, tomar decisiones informadas y saber dónde buscar ayuda para mejorar su bienestar y protección financiera sino que también resalta el hecho de tratar de empoderar a las personas, abordar la exclusión social y promover consumo responsable.<br> <br>En Moneta pensamos que la educación financiera es la comprensión de los productos financieros, así como la habilidad de tomar la mejor decisión a la hora de adquirir un producto financiero. ¿Y tú qué tanto sabes de educación financiera?<br>",
      img: "assets/img/aquaman.png",
      fecha: "13 de noviembre del 2020",
      autor: "Moneta Studio",
      cover: "../../../assets/img/articles/1-EducacionFinanciera.jpg",
      tags: ["Educacion", "Finanzas", "Productos Financieros"],
      biblio: ["OCDE. (2005). Improving Financial Literacy: Analysis of Issues and Policies. France : Organization for Economic Co-operation and Development (OECD).", "Financial Literacy and Education Commission. (2011). Promoting Financial Success in the United States: National Strategy for Financial Literacy, https://files.eric.ed.gov/fulltext/ED524620.pdf", "European Union. (2016). Financial Education for all. Visits and Publications, Second Edition, 68. 2020, De EESC Base de datos."]
    },
    /*{
      nombre: "Productos Financieros",
      resumen: "Existe varias definiciones de educación financiera: La OCDE lo define como un proceso mediante el cual los individuos adquieren una mejor comprensión de los conceptos",
      bio: " <b> ¿Qué es un producto financiero?</b><br> Un producto financiero es aquel instrumento que una persona puede adquirir con la finalidad de ahorrar o invertir.<br><br> <b>¿Quien otorga un producto financiero?</b> <br>La mayor parte de los productos financieros son emitidos por bancos, instituciones financieras, corredores de bolsa, proveedores de seguros, agencias de tarjetas de crédito y entidades patrocinadas por el gobierno.<br><br><b>¿Qué riesgos tiene?</b><br> El nivel de riesgo que se obtiene al adquirir un producto financiero depende del producto y del perfil de la persona.<br><br> <b>¿Cuantos tipos de productos financieros hay?</b><br><br> Existen 3 tipos de productos financieros:<br><br> &nbsp;&nbsp;&nbsp;&nbsp; &bull; Productos financieros de inversión: Fondos de inversión, acciones, bonos, productos estructurados, opciones, warrants, futuros, planes de pensiones. <br><br> &nbsp;&nbsp;&nbsp;&nbsp; &bull; Productos financieros de ahorro: Cuentas bancarias, depósitos bancarios, planes de pensiones. <br><br> &nbsp;&nbsp;&nbsp;&nbsp; &bull; Productos financieros de financiación: hipotecas, créditos, préstamos o tarjetas de crédito. <br><br>",
      img: "assets/img/aquaman.png",
      fecha: "20 de noviembre del 2020",
      autor: "Moneta Studio",
      cover: "../../../assets/img/articles/2-ProductosFinancieros",
      tags: ["Educacion", "Finanzas", "Productos Financieros"],
      biblio: ["Juanma Caurin. (2018). Productos financieros. 16 de noviembre del 2020, de economiasimple Sitio web: https://www.economiasimple.net/productos-financieros", "David Méndez. (2019). Producto financiero. 16 de noviembre del 2020, de numdea Sitio web: https://numdea.com/producto-financiero.html"]
    }*/

  ];

  constructor() {
  }

  getArticles() {
    return this.article;
  }

  getArticle(idx: string) {
    return this.article[idx]
  }

}

export interface Articulo {
  resumen: string;
  nombre: string;
  bio: string;
  img: string;
  fecha: string;
  autor: string;
  cover: string;
  tags: string[];
  biblio: string[];
}


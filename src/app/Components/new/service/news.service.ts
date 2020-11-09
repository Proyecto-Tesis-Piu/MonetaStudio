import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private noticia: Noticia[] = [
    {
      nombre: "Educación Financiera",
      resumen: "Existe varias definiciones de educación financiera: La OCDE lo define como un proceso mediante el cual los individuos adquieren una mejor comprensión de los conceptos",
      bio: "Existe varias definiciones de educación financiera: <br> <br> La OCDE lo define como un proceso mediante el cual los individuos adquieren una mejor comprensión de los conceptos y productos financieros y desarrollan las habilidades necesarias para tomar decisiones informadas, evaluar riesgos y oportunidades financieras, y mejorar su bienestar.<br> <br> Por otro lado la Comisión de Educación Financiera de Estados Unidos Financial Literacy and Education Commision lo define como  proveer la información y los conocimientos, así como ayudar a desarrollar las habilidades necesarias para evaluar las opciones y tomar las mejores decisiones financieras<br><br> La unión europea no solo define a la educación financiera como el proceso por el cual los consumidores e inversores aumentan la comprensión de productos financieros por medio de la información, aprendizaje y objetivos, desarrollando habilidades y la confianza de ser conscientes de los riesgos y oportunidades financieros por lo tanto, tomar decisiones informadas y saber dónde buscar ayuda para mejorar su bienestar y protección financiera sino que también resalta el hecho de tratar de empoderar a las personas, abordar la exclusión social y promover consumo responsable.<br> <br>En Moneta pensamos que la educación financiera es la comprensión de los productos financieros, así como la habilidad de tomar la mejor decisión a la hora de adquirir un producto financiero. ¿Y tú qué tanto sabes de educación financiera?<br>",
      img: "assets/img/aquaman.png",
      fecha: "11 de noviembre del 2020",
      autor: "Moneta Studio",
      cover: "../../../assets/img/news/1-EducacionFinanciera.jpg",
      tags: ["Educacion", "Finanzas", "Productos Financieros"],
      biblio: ["OCDE. (2005). Improving Financial Literacy: Analysis of Issues and Policies. France : Organization for Economic Co-operation and Development (OECD).", "Financial Literacy and Education Commission. (2011). Promoting Financial Success in the United States: National Strategy for Financial Literacy, https://files.eric.ed.gov/fulltext/ED524620.pdf", "European Union. (2016). Financial Education for all. Visits and Publications, Second Edition, 68. 2020, De EESC Base de datos."]
    }

  ];

  constructor() {
  }

  getNews() {
    return this.noticia;
  }

  getNew(idx: string) {
    return this.noticia[idx]
  }

}

export interface Noticia {
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


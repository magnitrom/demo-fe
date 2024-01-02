import { Component, Input, OnInit } from '@angular/core';

/* Funcion que se utiliza para definir los metadatos de la clase.. */
@Component({
  selector: 'app-sefin-chat',
  templateUrl: './sefin-chat.component.html',
  styleUrls: ['./sefin-chat.component.scss']
})

/* Es un componente de chatbot que recibe algunas entradas y muestra un chatbot */

export class SefinChatComponent implements OnInit {
  @Input() PERSON_NAME!: string;
  @Input() BOT_MSGS!: string[];
  @Input() BOT_IMG!: string;
  @Input() PERSON_IMG!: string;
  @Input() BOT_NAME!: string;
  @Input() welcomeMsg!: string;

  mensajes: any[] = [];

  constructor() { /* constructor */ }

  ngOnInit(): void { /* oninit */ }

  msgerForm = this.get('.msger-inputarea');
  msgerInput = '';
  msgerChat = this.get('.msger-chat');

  /**
* La función de envío se llama cuando el usuario hace clic en el botón Enviar. Toma el texto de la
   * campo de entrada y lo agrega a la ventana de chat. Luego llama a la función botResponse.
   * @returns Se devuelve la función botResponse().
   */
  submit() {
    const msgText = this.msgerInput;
    if (!msgText) return;

    this.appendMessage(this.PERSON_NAME, this.PERSON_IMG, 'right', msgText);
    this.msgerInput = '';

    this.botResponse();
  }

  /**
* Agrega un mensaje a la ventana de chat.
   * @param {any} nombre - any, img: any, lado: any, texto: any
   * @param {any} img - la imagen del usuario
   * @param {any} lado - izquierdo o derecho
   * @param {any} texto - el mensaje

   */
  appendMessage(name: any, img: any, side: any, text: any) {
    //   Simple solution for small apps

    let json = {
      side: side,
      img: img,
      name: name,
      date: this.formatDate(new Date()),
      text: text,
    };

    this.mensajes.push(json);

    let el: any = document.getElementById('end');
    el.scrollIntoView();

    let el2: any = document.getElementById('init');
    el2.scrollIntoView();
  }

/**
 * La función botResponse() se llama cuando el usuario hace clic en el botón Enviar. Genera un azar
 * número entre 0 y la longitud de la matriz BOT_MSGS. Luego usa ese número para seleccionar un mensaje
 * de la matriz BOT_MSGS. A continuación, calcula el tiempo de retardo en función del número de palabras en el
 * mensaje. Luego usa setTimeout() para retrasar el envío del mensaje por el tiempo de retraso calculado.
 */
  botResponse() {
    const r = this.random(0, this.BOT_MSGS.length - 1);
    const msgText = this.BOT_MSGS[r];
    const delay = msgText.split(' ').length * 100;

    setTimeout(() => {
      this.appendMessage(this.BOT_NAME, this.BOT_IMG, 'left', msgText);
    }, delay);
  }

/**
 * Devuelve el primer elemento del documento que coincide con el selector
 * @param {any} selector - El selector a consultar.
 * @param root: el elemento raíz desde el que buscar.
 * @returns El primer elemento que coincide con el selector.
 */
  get(selector: any, root = document) {
    return root.querySelector(selector);
  }


/* Es una función que devuelve la hora actual. */
  formatDate(date: any) {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

 
/* Es una función que devuelve la hora actual. */
  formatDate2(): any {
    let date = new Date();
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

/* Es una función que devuelve un número aleatorio entre min y max. */ 
  random(min: any, max: any) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

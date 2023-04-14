import api from './api/api';

export default class Game {
   constructor(element, url) {
      if (typeof element === 'string') {
         element = document.querySelector(element);
      }
      this.element = element;
      this.url = url;
      this.add = this.add.bind(this);
      this.onSubscribeData = this.onSubscribeData.bind(this);
      this.sse = new EventSource('https://sse-ws-game.onrender.com/sse');
      this.sse.addEventListener('message', this.onSubscribeData);
   }

   add() {
      const div = document.createElement('div');
      div.className = 'window';
      this.element.append(div);
      api.api('/index');
      api.api('/ping');
   }

   onSubscribeData(e) {
      const mainDiv = document.createElement('div');
      mainDiv.className = 'main';
      const div2 = document.createElement('div');
      div2.className = 'action ';


      if (e.data === 'Подождите немного... Обновляемся...') {
         console.log(123456);
         div2.className = 'reload ';
         mainDiv.className = 'main loading';
      } else if (e.data.indexOf('Нарушение правил') !== -1) {
         mainDiv.className = 'main sign';
      } else if (e.data.indexOf('Отличный удар') !== -1) {
         mainDiv.className = 'main ball';
      }

      // let x1 = 0;
      // setInterval(() => {
      //    console.log(arr[x1]);
      //    x1++;
      //    if (x1 >= arr.length) {
      //       x1 = 0;
      //    }
      // }, 5000);
      // console.log(arr[i]);

      // setInterval(() => { arrive(); }, 2000);

      // console.log(x)

      // const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

      // function main() {
      //    const arr = [1, 2, 3, 4, 5];
      //    for (let i = 0; i < arr.length; i++) {
      //       const y = setInterval(() => { console.log(arr[i]); }, 2000);
      //       return;
      //       // Если перед первым элементом задержка не нужна, то можно делать задержку после вывода,
      //       // иначе задержку надо поставить перед выводом элемента
      //    }
      // }
      // main();

      // setInterval(() => {
      //    console.log(i++);
      // }, 1000);
      div2.textContent = e.data;
      this.element.querySelector('.window').append(mainDiv);
      this.element.querySelectorAll('.main').forEach((element) => {
         element.append(div2);
      });
      // this.element.querySelector('.window').append(div2);
      // if (this.element.querySelectorAll('.action').length > 3) {
      //    this.sse.close();
      //    window.location.reload()
      // }

      // this.sse.close()
      console.log(e);
   }
}

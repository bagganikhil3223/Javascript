// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
    _data;

    render(data,render=true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;
        // emptying the container before inserting markup
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {// here we are creating the DOM update algorithm, so we'll compare the new DOM with old DOM and update the parts only which are different

        this._data = data;
        const newMarkup = this._generateMarkup();

        // Here we are creating the DOM node objects from a string..here this newDOM will become like a virtual DOM(that is not really living on the page)
        // but lives in our memory
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*')); // using Array.from to convert nodelist into array so that we can compare both
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl,i) => {
          const curEl = curElements[i];


          // Updates change texts
          if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
            curEl.textContent = newEl.textContent;
          }

          // Updates change attributes
          if(!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name,attr.value));
          }

        });


    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner () {
        const spinnerMarkup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
              this._clear();
              this._parentElement.insertAdjacentHTML('afterbegin',spinnerMarkup);
      
      };

      renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
      }

      renderMessage(message = this._message) {
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
      }

}
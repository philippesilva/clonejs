class Cloner {
  constructor(config) {
    this.config = config;

    this.$container = document.querySelector(config.containerSelector);
    this.$buttonAdd = document.querySelector(config.buttonSelector);
    this.$cloned = document.querySelector(config.cloneSelector);

    this._setup();
  }

  _setup() {
    this._removeFirstButtonDelete();
    this._setExistingButtonsRemove();

    this.$buttonAdd.addEventListener("click", () => this._process());
  }

  _process() {
    this.config.before();
    this._clone();
    this._increment();
    this.config.after();
  }

  _removeFirstButtonDelete() {
    document.querySelector(this.config.buttonDeleteSelector).style.display =
      "none";
  }

  _clone() {
    const $clone = this.$container
      .querySelector(`${this.config.cloneSelector}:last-child`)
      .cloneNode(true);

    $clone.querySelectorAll("input").forEach((x) => (x.value = ""));

    this._setCloneButtonRemove($clone);

    this.$container.appendChild($clone);
  }

  _setCloneButtonRemove(clone) {
    const $buttonRemove = clone.querySelector(this.config.buttonDeleteSelector);

    $buttonRemove.style.display = "block";
    $buttonRemove.addEventListener("click", () => {
      this._increment();
      clone.remove();
    });
  }

  _setExistingButtonsRemove() {
    const $buttons = this.$container.querySelectorAll(
      this.config.buttonDeleteSelector
    );

    $buttons.forEach((el) => {
      const clone = el.closest(this.config.cloneSelector);

      el.addEventListener("click", () => clone.remove());
    });

    this._increment();
  }

  _increment() {
    var clones = this.$container.querySelectorAll(this.config.cloneSelector);

    clones.forEach((element, index) => {
      const elements = element.querySelectorAll(["input", "select"]);

      elements.forEach((el) => {
        const attributeName = el.getAttribute("name");

        if (attributeName !== null) {
          const nameFirst = attributeName.split("[")[0];
          const nameLast = attributeName.split("]")[1];

          const name = `${nameFirst}[${index}]${nameLast}`;

          el.setAttribute("name", name);
        }
      });
    });
  }
}


/*==================================
Teste
====================================*/

const cloner = new Cloner({
  containerSelector: ".cloner-container",
  cloneSelector: ".cloner-clone",
  buttonSelector: ".cloner-button-add",
  buttonDeleteSelector: ".cloner-button-remove",
  increment: true,
  before: () => {
    console.log('after');
  },
  after: () => {
    console.log('after');
  },
});

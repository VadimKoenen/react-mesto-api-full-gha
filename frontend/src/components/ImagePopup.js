import React from 'react';


function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-picture ${card.link ? 'popup_open' : ''}`}>
      <figure className="popup-picture__figure">
        <button className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
        </button>
        <img className="popup-picture__image"
          src={card.link}
          alt={card.name} />
        <figcaption>
          <h2 className="popup-picture__heading">{card.name}</h2>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
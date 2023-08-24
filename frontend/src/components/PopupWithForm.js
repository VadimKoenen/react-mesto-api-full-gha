import React from 'react';

function PopupWithForm({
    name,
    title,
    card,
    onClose,
    isOpen,
    buttonName,
    onSubmit,
    children,
}) {
    return (
        <div className={`popup popup-${name} ${isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}>
                </button>

                <h2 className="popup__name">{title}</h2>
                <form
                    action="#"
                    className="popup__form"
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button className="popup__save-button"
                        type="submit"
                        value="Сохранить"
                        name="sendForm"
                    >{buttonName}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm
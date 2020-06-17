import React, { useState, useEffect } from 'react';
import './chips.css';
export const CustomChips = ({ placeholder, max }) => {
  const maxlength = 20;
  const INVALID_CHARS = new RegExp('/[^a-zA-Z0-9 ]/g');
  const [KEY] = useState({
    backspace: 8,
    tab: 9,
    enter: 13,
  });
  const [chips, addChips] = useState([]);

  //   const setChips = (chips) => {
  //     if (chips && chips.length) addChips(chips);
  //   };

  const onKeyDown = (event) => {
    let keyPressed = event.which;

    if (
      keyPressed === KEY.enter ||
      (keyPressed === KEY.tab && event.target.value)
    ) {
      event.preventDefault();
      updateChips(event);
    } else if (keyPressed === KEY.backspace) {
      let chips = chips;

      if (!event.target.value && chips.length) {
        deleteChip(chips[chips.length - 1]);
      }
    }
  };

  const clearInvalidChars = (event) => {
    let value = event.target.value;

    if (INVALID_CHARS.test(value)) {
      event.target.value = value.replace(INVALID_CHARS, '');
    } else if (value.length > maxlength) {
      event.target.value = value.substr(0, maxlength);
    }
  };

  const updateChips = (event) => {
    if (!max || chips.length < max) {
      let value = event.target.value;

      if (!value) return;

      let chip = value.trim().toLowerCase();

      if (chip && chips.indexOf(chip) < 0) {
        addChips([...chip]);
      }
    }

    event.target.value = '';
  };

  const deleteChip = (chip) => {
    let index = chips.indexOf(chip);

    if (index >= 0) {
      let newtag = [...chips];
      addChips([...newtag.splice(index, 1)]);
    }
  };

  const focusInput = (event) => {
    let children = event.target.children;
    if (children.length) children[children.length - 1].focus();
  };

  let addedchips = chips.map((chip, index) => {
    return (
      <span className="chip" key={index}>
        <span className="chip-value">{chip}</span>
        <button
          type="button"
          className="chip-delete-button"
          onClick={deleteChip.bind(null, chip)}
        >
          x
        </button>
      </span>
    );
  });

  let placeHolder = !max || addedchips.length < max ? placeholder : '';

  return (
    <div className="chips" onClick={focusInput}>
      {addedchips}
      <input
        type="text"
        className="chips-input"
        placeholder={placeHolder}
        onKeyDown={onKeyDown}
        onKeyUp={clearInvalidChars}
      />
    </div>
  );
};

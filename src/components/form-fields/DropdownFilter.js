import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const DropdownFilter = (props) => {
  const [isOpen, toggleDropdown] = useState(false);
  const [label, setLabel] = useState(props.label ? props.label : 'Filter By Campaign');

  const showDropdown = (event) => {
    event.preventDefault();
    toggleDropdown(true);
    document.addEventListener('click', hideDropdown);
  };

  const hideDropdown = () => {
    toggleDropdown(false);
    document.removeEventListener('click', hideDropdown);
  };

  /**
   * Returns View of items
   * @param {array} items
   */
  const loadViewOfItems = (items) => {
    return items.map(item => {
      return <Link className="dropdown-item" to="#" key={item.id} onClick={(event) => setDropdown(event, item)} >{item.name === '' ? item.id : item.name}</Link>;
    });
  };

  /**
   * Set selected item name and pass item to callback
   * @param {Object} event
   * @param {Object} item
   */
  const setDropdown = (event, item) => {
    event.preventDefault();
    setLabel(item.name === '' ? item.id : item.name);
    props.dropwDownCallBack(item);
  };

  useEffect(() => {
    setLabel(props.label ? props.label : 'Filter By Campaign');
  }, [props.itemList]);

  return (
    <div className="dropdown dropdown-filter">
      <button className="btn btn-outline-primary dropdown-toggle" onClick={(event) => showDropdown(event)}>{label}</button>
      <div className={`dropdown-menu ${(isOpen ? 'show' : 'hide')}`} aria-labelledby="dropdownMenuButton">
        {
          props.itemList.length
            ? loadViewOfItems(props.itemList)
            : 'No Item'
        }
      </div>
    </div>
  );
};

DropdownFilter.propTypes = {
  label: PropTypes.any,
  itemList: PropTypes.array,
  dropwDownCallBack: PropTypes.func,
};

export default DropdownFilter;

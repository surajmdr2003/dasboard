import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const DropdownFilter = (props) => {
  const [isOpen, toggleDropdown] = useState(false);
  const [label, setLabel] = useState(props.label ? props.label : 'Filter By Campaign');

  const showDropdown = () => {
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
      return <Link className="dropdown-item" to="#" key={item.id} onClick={() => setDropdown(item)} >{item.name === '' ? item.id : item.name}</Link>;
    });
  };

  /**
   * Set selected item name and pass item to callback
   * @param {Object} item
   */
  const setDropdown = (item) => {
    setLabel(item.name === '' ? item.id : item.name);
    props.dropwDownCallBack(item);
  };

  useEffect(() => {
    setLabel(props.label ? props.label : 'Filter By Campaign');
  }, [props]);

  return (
    <div className="dropdown dropdown-filter">
      <button className="btn btn-outline-primary dropdown-toggle" onClick={() => showDropdown()}>{label}</button>
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

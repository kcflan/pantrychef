import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 50px;
`;

const SearchFood = props => {
  return (
    <Div className="container">
      <div className="row">
        <div className="input-field col l12 center-align">
          <textarea
            id="textarea1"
            className="materialize-textarea center-align"
            onChange={props.handleInputChangeFood}
            value={props.value}
            name="search"
            type="text"
            placeholder="FOOD,Apples, cheese, lettuce, chicken"
            id="search"
          />
          <a className="indigo darken-4 waves-effect waves-light btn" onClick={props.handleFormSubmitFood}>
            search
          </a>
        </div>
      </div>
    </Div>
  );
};

export default SearchFood;
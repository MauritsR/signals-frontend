import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { makeSelectSubCategories } from 'models/categories/selectors';
import { breakpoint } from '@datapunt/asc-ui';
import { fetchCategories } from 'models/categories/actions';
import { makeSelectIncidentContainer } from 'signals/incident/containers/IncidentContainer/selectors';
import { isAuthenticated } from 'shared/services/auth/auth';

const DescriptionInfoStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    flex-direction: column;
  }

  & > :first-child {
    flex-grow: 1;
    white-space: nowrap;
  }
`;

const DescriptionInfo = ({ info }) => {
  const dispatch = useDispatch();
  const subcategories = useSelector(makeSelectSubCategories);
  const { subcategoryPrediction } = useSelector(makeSelectIncidentContainer);
  const [suggestion, setSuggestion] = useState();

  useEffect(() => {
    if (!subcategories && isAuthenticated()) {
      dispatch(fetchCategories());
    }
  }, [subcategories, dispatch]);

  useEffect(() => {
    if (!subcategories) return;
    setSuggestion(subcategories.find(s => s.is_active && s.slug === subcategoryPrediction));
  }, [subcategories, subcategoryPrediction]);

  return (
    <DescriptionInfoStyle data-testid="descriptionInfo">
      <div>{info}</div>
      {suggestion && <div>{`Subcategorie voorstel: ${suggestion.name}`}</div>}
    </DescriptionInfoStyle>
  );
};

DescriptionInfo.propTypes = {
  info: PropTypes.string.isRequired,
};

export default DescriptionInfo;

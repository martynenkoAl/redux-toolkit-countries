import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectVisibleCountries,
  selectCountriesInfo,
  loadCountries,
} from './countries-slice';
import { selectControls } from '../controls/controls-slice';

export const useCountries = () => {
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};

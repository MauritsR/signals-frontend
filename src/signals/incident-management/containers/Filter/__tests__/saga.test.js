import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { takeLatest } from 'redux-saga/effects';

import { authPostCall, authPatchCall } from 'shared/services/api/api';
import filterSaga, {
  doSaveFilter,
  doUpdateFilter,
  saveFilter,
  updateFilter,
  requestURL,
} from '../saga';
import {
  SAVE_FILTER_SUCCESS,
  SAVE_FILTER_FAILED,
  SAVE_FILTER,
  UPDATE_FILTER,
  UPDATE_FILTER_SUCCESS,
} from '../constants';
import {
  filterSaveFailed,
  filterUpdatedFailed,
  filterSaveSuccess,
  filterUpdatedSuccess,
} from '../actions';

describe.skip('signals/incident-management/containers/Filter/saga', () => {
  it('should watch filterSaga', () => {
    testSaga(filterSaga)
      .next()
      .all([
        takeLatest(SAVE_FILTER, saveFilter),
        takeLatest(UPDATE_FILTER, updateFilter),
      ])
      .next()
      .isDone();
  });

  describe('doSaveFilter', () => {
    const filterData = {
      name: 'Name of my filter',
      maincategory_slug: ['i', 'a', 'o', 'u'],
      address_text: 'Weesperstraat 113-117',
    };

    const { name, ...options } = filterData;

    const payload = filterData;
    const payloadResponse = {
      ...payload,
      key: 'something',
    };
    const action = {
      type: SAVE_FILTER,
      payload,
    };

    it('should call endpoint with filter data', () => {
      testSaga(doSaveFilter, action)
        .next()
        .call(authPostCall, requestURL, { name, options })
        .next(payloadResponse)
        .put(filterSaveSuccess(payloadResponse))
        .next()
        .isDone();
    });

    it('should dispatch success', () => {
      expectSaga(doSaveFilter, action)
        .provide([[matchers.call.fn(authPostCall), payloadResponse]])
        .put({
          type: SAVE_FILTER_SUCCESS,
          payload: payloadResponse,
        })
        .run();
    });

    it('should dispatch failed', () => {
      expectSaga(doSaveFilter, { payload: { ...payload, name: undefined } })
        .put({
          type: SAVE_FILTER_FAILED,
          payload: 'No name supplied',
        })
        .run();
    });

    it('catches anything', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 300,
      };

      testSaga(doSaveFilter, action)
        .next()
        .throw(error)
        .put(filterSaveFailed(error))
        .next()
        .isDone();
    });

    it('catches 400', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 400,
      };

      testSaga(doSaveFilter, action)
        .next()
        .throw(error)
        .put(filterSaveFailed('Invalid data supplied'))
        .next()
        .isDone();
    });

    it('catches 500', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 500,
      };

      testSaga(doSaveFilter, action)
        .next()
        .throw(error)
        .put(filterSaveFailed('Internal server error'))
        .next()
        .isDone();
    });
  });

  describe('doUpdateFilter', () => {
    const updatePayload = {
      id: 1234,
      name: 'Name of my filter',
      maincategory_slug: ['i', 'a', 'o', 'u'],
      address_text: 'Weesperstraat 113-117',
    };
    const { name, id, ...options } = updatePayload;
    const payload = {
      name: 'New name of my filter',
      maincategory_slug: ['i', 'a'],
    };
    const action = {
      type: UPDATE_FILTER,
      payload,
    };

    it('should call endpoint with filter data', () => {
      testSaga(doUpdateFilter, { ...action, payload: updatePayload })
        .next()
        .call(authPatchCall, `${requestURL}${id}`, { name, options })
        .next(updatePayload)
        .put(filterUpdatedSuccess(updatePayload))
        .next()
        .isDone();
    });

    it('should dispatch success', () => {
      const payloadResponse = { ...updatePayload, payload };
      expectSaga(doUpdateFilter, action)
        .provide([[matchers.call.fn(authPatchCall), payloadResponse]])
        .put({
          type: UPDATE_FILTER_SUCCESS,
          payload: payloadResponse,
        })
        .run();
    });

    it('catches anything', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 300,
      };

      testSaga(doUpdateFilter, action)
        .next()
        .throw(error)
        .put(filterUpdatedFailed(error))
        .next()
        .isDone();
    });

    it('catches 400', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 400,
      };

      testSaga(doUpdateFilter, action)
        .next()
        .throw(error)
        .put(filterUpdatedFailed('Invalid data supplied'))
        .next()
        .isDone();
    });

    it('catches 500', () => {
      const error = new Error('Something bad happened');
      error.response = {
        status: 500,
      };

      testSaga(doUpdateFilter, action)
        .next()
        .throw(error)
        .put(filterUpdatedFailed('Internal server error'))
        .next()
        .isDone();
    });
  });

  describe('saveFilter', () => {
    it('should spawn doSaveFilter', () => {
      const payload = {
        name: 'Name of my filter',
        maincategory_slug: ['i', 'a', 'o', 'u'],
        address_text: 'Weesperstraat 113-117',
      };
      const action = {
        type: SAVE_FILTER,
        payload,
      };

      expectSaga(saveFilter, action)
        .spawn(doSaveFilter, action)
        .run();
    });
  });

  describe('updateFilter', () => {
    it('should spawn doUpdateFilter', () => {
      const payload = {
        id: 1234,
        name: 'New name of my filter',
        maincategory_slug: ['i', 'a'],
      };
      const action = {
        type: UPDATE_FILTER,
        payload,
      };

      expectSaga(updateFilter, action)
        .spawn(doUpdateFilter, action)
        .run();
    });
  });
});
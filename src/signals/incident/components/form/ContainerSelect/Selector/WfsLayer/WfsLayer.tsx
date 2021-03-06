import React, { useContext, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useMapInstance } from '@amsterdam/react-maps';
import { fetchWithAbort } from '@amsterdam/arm-core';
import type { ZoomLevel } from '@amsterdam/arm-core/lib/types';
import type { FeatureCollection } from 'geojson';
import type { DataLayerProps } from 'signals/incident/components/form/ContainerSelect/types';
import L from 'leaflet';
import type { Map as MapType } from 'leaflet';

import ContainerSelectContext from 'signals/incident/components/form/ContainerSelect/context';
import { NO_DATA, WfsDataProvider } from './context';
import useLayerVisible from '../useLayerVisible';

const SRS_NAME = 'urn:ogc:def:crs:EPSG::4326';

export interface WfsLayerProps {
  children: React.ReactElement<DataLayerProps>;
  zoomLevel?: ZoomLevel;
}

const WfsLayer: FunctionComponent<WfsLayerProps> = ({ children, zoomLevel = {} }) => {
  const mapInstance = useMapInstance();
  const { meta, setMessage } = useContext(ContainerSelectContext);
  const url = meta.endpoint;
  const layerVisible = useLayerVisible(zoomLevel);

  const getBbox = (map: MapType): string => {
    const bounds = map.getBounds();
    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()},${SRS_NAME}`;
    return `&${L.Util.getParamString({
      bbox,
    }).substring(1)}`;
  };

  const [bbox, setBbox] = useState('');
  const [data, setData] = useState<FeatureCollection>(NO_DATA);

  /* istanbul ignore next */
  useEffect(() => {
    function onMoveEnd() {
      setBbox(getBbox(mapInstance));
    }

    mapInstance.on('moveend', onMoveEnd);

    return () => {
      mapInstance.off('moveend', onMoveEnd);
    };
  }, [mapInstance]);

  useEffect(() => {
    setMessage(undefined);
    if (!layerVisible) {
      setData(NO_DATA);
      return;
    }

    const extent = bbox || getBbox(mapInstance);
    const [request, controller] = fetchWithAbort(`${url}${extent}`);

    request
      .then(async result => result.json())
      .then(result => {
        setData(result);
        return null;
      })
      .catch(error => {
        // Ignore abort errors since they are expected to happen.
        if (error instanceof Error && error.name === 'AbortError') {
          // eslint-disable-next-line promise/no-return-wrap
          return;
        }

        // eslint-disable-next-line no-console
        console.error('Unhnadled Error in wfs call', JSON.stringify(error));
        setMessage('Kaart informatie kon niet worden opgehaald.');
      });

    return () => {
      controller.abort();
    };
  }, [bbox, mapInstance, url, layerVisible, setMessage]);

  const layer = React.cloneElement(children, { featureTypes: meta.featureTypes });
  return <WfsDataProvider value={data}>{layer}</WfsDataProvider>;
};

export default WfsLayer;

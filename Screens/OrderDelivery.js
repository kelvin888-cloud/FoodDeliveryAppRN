import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  icons,
  images,
  COLORS,
  SIZES,
  FONTS,
  MetricsSizes,
  Layout,
  gutters,
  GOOGLE_API_KEY,
} from '../constants';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import LinearGradient from 'react-native-linear-gradient';

const IndexOrderDeliveryContainer = ({route, navigation}) => {
  const mapView = useRef();

  const [region, setRegion] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [toLocation, setToLocation] = useState(null);
  const [restaurant, setRestaurants] = useState(null);
  const [fromLocation, setFromLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsready] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let {restaurants, currentLocation} = route.params;

    let fromLoc = currentLocation.gps;
    let street = currentLocation.streetName;
    let toLoc = restaurants.location;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setRestaurants(restaurants);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={[
            Layout.center,
            Layout.buttonBorderRadiusSmall,
            {
              height: MetricsSizes.large + 10,
              width: MetricsSizes.large + 10,
              backgroundColor: COLORS.purewhite,
            },
          ]}>
          <View
            style={[
              Layout.buttonBorderRadius,
              Layout.center,
              {
                width: MetricsSizes.large,
                height: MetricsSizes.large,
                backgroundColor: COLORS.primary,
              },
            ]}>
            <Image
              source={icons.pin}
              style={{
                width: MetricsSizes.medium + 1,
                height: MetricsSizes.medium + 1,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={icons.car}
          style={{
            width: MetricsSizes.large + 10,
            height: MetricsSizes.large + 10,
          }}
        />
      </Marker>
    );

    return (
      <View style={Layout.fill}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={Layout.fill}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result.duration);
              if (!isReady) {
                //fit into map route
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });

                // reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0]['latitude'],
                  longitude: result.coordinates[0]['longitude'],
                };

                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }
                setFromLocation(nextLoc);
                setIsready(true);
              }
            }}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View
        style={[
          Layout.positionAbsolute,
          Layout.center,
          {
            top: MetricsSizes.large + 20,
            left: MetricsSizes.zero,
            right: MetricsSizes.zero,
            height: MetricsSizes.large + 20,
          },
        ]}>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            gutters.smallVPadding,
            gutters.mediumHPadding,
            Layout.buttonBorderRadiusLarge,
            {width: SIZES.width * 0.9, backgroundColor: COLORS.purewhite},
          ]}>
          <Image
            source={icons.red_pin}
            style={[
              gutters.smallRMargin,
              {
                width: MetricsSizes.medium + 5,
                height: MetricsSizes.medium + 5,
              },
            ]}
          />

          <View style={Layout.fill}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: SIZES.body3,
                lineHeight: 22,
                fontWeight: 'bold',
              }}>
              {streetName}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: SIZES.body3,
              lineHeight: 22,
              fontWeight: 'bold',
            }}>
            {Math.ceil(duration)} mins
          </Text>
        </View>
      </View>
    );
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={[
          Layout.positionAbsolute,
          Layout.center,
          {
            bottom: MetricsSizes.large + 20,
            left: MetricsSizes.zero,
            right: MetricsSizes.zero,
          },
        ]}>
        <View
          style={[
            gutters.largeVPadding,
            gutters.mediumHPadding,
            Layout.buttonBorderRadiusLarge,
            {
              width: SIZES.width * 0.9,
              backgroundColor: COLORS.purewhite,
            },
          ]}>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            {/* avatar */}
            <Image
              source={restaurant?.courier.avatar}
              style={[
                Layout.buttonBorderRadiusMedium,
                {
                  width: MetricsSizes.large + 20,
                  height: MetricsSizes.large + 20,
                },
              ]}
            />

            <View style={[Layout.fill, gutters.smallLMargin]}>
              {/* name and rating */}
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: SIZES.h4,
                    lineHeight: 22,
                    fontWeight: '700',
                  }}>
                  {restaurant?.courier.name}
                </Text>
                <View style={Layout.row}>
                  <Image
                    source={icons.star}
                    style={[
                      gutters.smallRMargin,
                      {
                        width: MetricsSizes.small + 8,
                        height: MetricsSizes.small + 8,
                        tintColor: COLORS.primary,
                      },
                    ]}
                  />

                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      fontSize: SIZES.body3,
                      lineHeight: 22,
                      fontWeight: 'bold',
                    }}>
                    {restaurant?.rating}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: COLORS.darkergray,
                  fontFamily: 'Roboto-Bold',
                  fontSize: SIZES.h5,
                  lineHeight: 22,
                  fontWeight: '700',
                }}>
                {restaurant?.name}
              </Text>
            </View>
          </View>

          {/* Buttons */}

          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              gutters.mediumTMargin,
            ]}>
            {/* <TouchableOpacity
              style={[
                Layout.center,
                Layout.buttonBorderRadiusXsmall,
                Layout.fill,
                gutters.smallRMargin,
                {
                  height: MetricsSizes.large + 20,

                  backgroundColor: COLORS.primary,
                },
              ]}
              onPress={() => navigation.navigate('Home')}>
              <Text
                style={{
                  color: COLORS.purewhite,
                  fontFamily: 'Roboto-Bold',
                  fontSize: SIZES.h5,
                  lineHeight: 22,
                  fontWeight: '700',
                }}>
                Call
              </Text>
            </TouchableOpacity> */}

            <LinearGradient
              colors={COLORS.blueGradient}
              style={[
                Layout.center,
                Layout.buttonBorderRadiusXsmall,
                Layout.fill,
                gutters.smallRMargin,
                {
                  height: MetricsSizes.large + 20,
                  width: MetricsSizes.large + 20,
                },
              ]}>
              <Text
                style={{
                  color: COLORS.purewhite,
                  fontFamily: 'Roboto-Bold',
                  fontSize: SIZES.h5,
                  lineHeight: 22,
                  fontWeight: '700',
                }}
                onPress={() => navigation.navigate('Home')}>
                Call
              </Text>
            </LinearGradient>

            <TouchableOpacity
              style={[
                Layout.center,
                Layout.buttonBorderRadiusXsmall,
                Layout.fill,
                {
                  height: MetricsSizes.large + 20,

                  backgroundColor: COLORS.secondary,
                },
              ]}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: COLORS.purewhite,
                  fontFamily: 'Roboto-Bold',
                  fontSize: SIZES.h5,
                  lineHeight: 22,
                  fontWeight: '700',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderButtonsZoomInAndOut() {
    return (
      <View
        style={[
          Layout.positionAbsolute,
          Layout.justifyContentBetween,
          {
            bottom: SIZES.height * 0.35,
            right: SIZES.padding * 2,
            width: 60,
            height: 130,
          },
        ]}>
        {/* Zoom In */}

        <TouchableOpacity
          style={[
            Layout.buttonBorderRadiusLarge,
            Layout.center,
            {
              width: MetricsSizes.large + 20,
              height: MetricsSizes.large + 20,
              backgroundColor: COLORS.purewhite,
            },
          ]}
          onPress={() => zoomIn()}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: SIZES.body1,
              lineHeight: 36,
              fontWeight: 'bold',
            }}>
            +
          </Text>
        </TouchableOpacity>

        {/* Zoom out */}

        <TouchableOpacity
          style={[
            Layout.buttonBorderRadiusLarge,
            Layout.center,
            {
              width: MetricsSizes.large + 20,
              height: MetricsSizes.large + 20,
              backgroundColor: COLORS.purewhite,
            },
          ]}
          onPress={() => zoomOut()}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: SIZES.body1,
              lineHeight: 36,
              fontWeight: 'bold',
            }}>
            -
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={Layout.fill}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderButtonsZoomInAndOut()}
    </View>
  );
};

export default IndexOrderDeliveryContainer;

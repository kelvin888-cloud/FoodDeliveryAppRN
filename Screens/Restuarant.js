import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {
  icons,
  images,
  COLORS,
  SIZES,
  FONTS,
  MetricsSizes,
  Layout,
  gutters,
} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {isIphoneX} from 'react-native-iphone-x-helper';

const IndexRestuarantContainer = ({route, navigation}) => {
  const scrollx = new Animated.Value(0);
  const [restaurants, setRestaurants] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItem] = useState([]);

  useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurants(item);
    setCurrentLocation(currentLocation);
  }, []);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.menuId == menuId);
    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItem(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItem(orderList);
    }
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter(a => a.menuId == menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    } else {
      return 0;
    }
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }

  function renderHeader() {
    return (
      <View
        style={[
          Layout.row,
          gutters.mediumTMargin,
          {height: MetricsSizes.regular + 20},
        ]}>
        <TouchableOpacity
          style={[
            gutters.mediumLPadding,
            Layout.justifyContentCenter,
            {width: MetricsSizes.regular + 20},
          ]}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: MetricsSizes.medium + 5,
              height: MetricsSizes.medium + 5,
            }}
          />
        </TouchableOpacity>

        {/* Restuarant Name Section */}

        <View style={[Layout.fill, Layout.center]}>
          <View
            style={[
              Layout.center,
              gutters.largeHPadding,
              Layout.buttonBorderRadiusLarge,
              {
                height: MetricsSizes.large + 20,
                backgroundColor: COLORS.lightGray3,
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: SIZES.h5,
                lineHeight: 22,
                fontWeight: 'bold',
              }}>
              {restaurants?.name}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            gutters.mediumRPadding,
            Layout.justifyContentCenter,
            {width: MetricsSizes.regular + 20},
          ]}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{
              width: MetricsSizes.medium + 5,
              height: MetricsSizes.medium + 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}>
        {restaurants?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={Layout.alignItemsCenter}>
            <View
              style={[gutters.mediumTMargin, {height: SIZES.height * 0.35}]}>
              {/* food image */}
              <Image
                source={item.photo}
                resizeMode="contain"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />

              {/* Quantity section */}
              <View
                style={[
                  Layout.row,
                  Layout.positionAbsolute,
                  Layout.justifyContentCenter,

                  {
                    bottom: -20,
                    width: SIZES.width,
                    height: MetricsSizes.large + 20,
                  },
                ]}>
                <TouchableOpacity
                  style={[
                    Layout.center,
                    {
                      width: 50,
                      backgroundColor: COLORS.purewhite,
                      borderTopLeftRadius: MetricsSizes.medium + 5,
                      borderBottomLeftRadius: MetricsSizes.medium + 5,
                    },
                  ]}
                  onPress={() => editOrder('-', item.menuId, item.price)}>
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
                <View
                  style={[
                    Layout.center,
                    {width: 50, backgroundColor: COLORS.purewhite},
                  ]}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      fontSize: SIZES.body2,
                      lineHeight: 36,
                      fontWeight: 'bold',
                    }}>
                    {getOrderQty(item.menuId)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    Layout.center,
                    {
                      width: 50,
                      backgroundColor: COLORS.purewhite,
                      borderTopRightRadius: MetricsSizes.medium + 5,
                      borderBottomRightRadius: MetricsSizes.medium + 5,
                    },
                  ]}
                  onPress={() => editOrder('+', item.menuId, item.price)}>
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
              </View>
            </View>

            {/* Name & description */}
            <View
              style={[
                Layout.alignItemsCenter,
                gutters.regularTMargin,
                gutters.mediumHPadding,
                {
                  width: SIZES.width,
                },
              ]}>
              <Text
                style={[
                  gutters.smallVMargin,
                  Layout.textAlignment,
                  {
                    fontFamily: 'Roboto-Bold',
                    fontSize: SIZES.h3,
                    lineHeight: 30,
                    fontWeight: 'bold',
                  },
                ]}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: SIZES.body3,
                  lineHeight: 22,
                  fontWeight: 'bold',
                }}>
                {item.description}
              </Text>
            </View>

            {/* calories */}
            <View style={[Layout.row, gutters.smallTMargin]}>
              <Image
                source={icons.fire}
                style={[
                  gutters.smallRMargin,
                  {
                    width: MetricsSizes.medium,
                    height: MetricsSizes.medium,
                  },
                ]}
              />

              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: SIZES.body3,
                  lineHeight: 22,
                  fontWeight: 'bold',
                  color: COLORS.darkgray,
                }}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollx, SIZES.width);
    return (
      <View style={{height: MetricsSizes.large}}>
        <View style={[Layout.row, Layout.center, {height: SIZES.padding}]}>
          {restaurants?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={[
                  Layout.buttonBorderRadiusLarge,
                  {
                    marginHorizontal: MetricsSizes.tiny + 1,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColor,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.purewhite,
            borderTopLeftRadius: MetricsSizes.large + 10,
            borderTopRightRadius: MetricsSizes.large + 10,
          }}>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              gutters.mediumVPadding,
              gutters.largeHPadding,
              {
                borderBottomColor: COLORS.lightGray2,
                borderBottomWidth: 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: SIZES.h3,
                lineHeight: 22,
                fontWeight: 'bold',
              }}>
              {getBasketItemCount()} {''}
              items in Cart
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: SIZES.h3,
                lineHeight: 22,
                fontWeight: 'bold',
              }}>
              ${sumOrder()}
            </Text>
          </View>

          <View
            style={[
              Layout.row,
              Layout.scrollSpaceBetween,
              gutters.mediumVPadding,
              gutters.largeHPadding,
            ]}>
            <View style={Layout.row}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: MetricsSizes.medium,
                  height: MetricsSizes.medium,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text
                style={[
                  gutters.smallLMargin,
                  {
                    fontFamily: 'Roboto-Bold',
                    fontSize: SIZES.h4,
                    lineHeight: 22,
                    fontWeight: 'bold',
                  },
                ]}>
                Location
              </Text>
            </View>

            <View style={Layout.row}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{
                  width: MetricsSizes.medium,
                  height: MetricsSizes.medium,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text
                style={[
                  gutters.smallLMargin,
                  {
                    fontFamily: 'Roboto-Bold',
                    fontSize: SIZES.h4,
                    lineHeight: 22,
                    fontWeight: 'bold',
                  },
                ]}>
                8888
              </Text>
            </View>
          </View>

          {/* order button */}

          <View style={[Layout.center, {padding: SIZES.padding * 2}]}>
            <LinearGradient
            colors={COLORS.blueGradient}
              style={[
                Layout.alignItemsCenter,
                Layout.buttonBorderRadiusLarge,
                {
                  width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  
                },
              ]}
              >
              <TouchableOpacity
             onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurants: restaurants,
                  currentLocation: currentLocation,
                })
              }>
              <Text
                style={{
                  color: COLORS.purewhite,
                  fontFamily: 'Roboto-Bold',
                  fontSize: SIZES.h3,
                  lineHeight: 22,
                  fontWeight: '700',
                }}>
                Order
              </Text>
              </TouchableOpacity>
             
            </LinearGradient>
          </View>
        </View>

        {isIphoneX() && (
          <View
            style={[
              Layout.positionAbsolute,
              {
                bottom: -34,
                left: MetricsSizes.zero,
                right: MetricsSizes.zero,
                height: MetricsSizes.large + 4,
                backgroundColor: COLORS.white,
              },
            ]}></View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={[Layout.fill, {backgroundColor: COLORS.lightGray2}]}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

export default IndexRestuarantContainer;
